from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.assessment import Assessment
from app.models.finding import Finding

from app.services.security_service import (
    check_headers,
    check_ssl,
    scan_ports,
    run_nmap,
)

from app.services.intelligence_service import (
    get_whois,
    get_dns,
    get_technology,
    check_robots,
    check_sitemap,
    get_http_methods,
    get_server_information,
)

from app.services.risk_engine import calculate_risk

router = APIRouter(
    prefix="/security",
    tags=["Security Assessment"],
)


class SecurityRequest(BaseModel):
    target: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/scan")
def run_security_scan(data: SecurityRequest, db: Session = Depends(get_db)):

    target = data.target.strip()

    if not target:
        return {
            "success": False,
            "message": "Target cannot be empty."
        }

    import concurrent.futures

    with concurrent.futures.ThreadPoolExecutor(max_workers=11) as executor:
        future_headers = executor.submit(check_headers, target)
        future_ssl = executor.submit(check_ssl, target)
        future_ports = executor.submit(scan_ports, target)
        future_nmap = executor.submit(run_nmap, target)
        future_whois = executor.submit(get_whois, target)
        future_dns = executor.submit(get_dns, target)
        future_tech = executor.submit(get_technology, target)
        future_robots = executor.submit(check_robots, target)
        future_sitemap = executor.submit(check_sitemap, target)
        future_methods = executor.submit(get_http_methods, target)
        future_server = executor.submit(get_server_information, target)

        try:
            headers = future_headers.result(timeout=6.0)
        except Exception:
            headers = {}

        try:
            ssl_result = future_ssl.result(timeout=6.0)
        except Exception:
            ssl_result = {"status": "Unavailable"}

        try:
            ports = future_ports.result(timeout=6.0)
        except Exception:
            ports = []

        try:
            nmap = future_nmap.result(timeout=6.0)
        except Exception:
            nmap = {"installed": False, "message": "Nmap scan failed."}

        try:
            whois_info = future_whois.result(timeout=6.0)
        except Exception:
            whois_info = {"error": "WHOIS lookup failed."}

        try:
            dns_info = future_dns.result(timeout=6.0)
        except Exception:
            dns_info = {"A": [], "MX": [], "NS": []}

        try:
            technologies = future_tech.result(timeout=6.0)
        except Exception:
            technologies = {}

        try:
            robots = future_robots.result(timeout=6.0)
        except Exception:
            robots = {"found": False}

        try:
            sitemap = future_sitemap.result(timeout=6.0)
        except Exception:
            sitemap = {"found": False}

        try:
            methods = future_methods.result(timeout=6.0)
        except Exception:
            methods = {}

        try:
            server = future_server.result(timeout=6.0)
        except Exception:
            server = {"server": "Unknown", "powered_by": "Unknown"}

    scan_result = {
        "headers": headers,
        "ssl": ssl_result,
        "open_ports": ports,
        "server": server,
        "technology": technologies,
        "robots": robots,
        "sitemap": sitemap,
    }

    risk = calculate_risk(scan_result)

    # Persist every completed website scan so the dashboard, history and reports
    # reflect the user's actual activity instead of static demo values.
    import json
    full_report = dict(scan_result)
    full_report["security_score"] = risk["score"]
    full_report["risk_level"] = risk["risk"].capitalize()
    full_report["recommendations"] = risk["recommendations"]

    assessment = Assessment(
        name=f"Website scan — {target}",
        target=target,
        input_type="Website",
        status="Completed",
        raw_results=json.dumps(full_report)
    )
    db.add(assessment)
    db.flush()

    severity = risk["risk"].capitalize()
    for recommendation in risk["recommendations"]:
        if recommendation == "No major security issues detected.":
            continue
        db.add(Finding(
            assessment_id=assessment.id,
            scanner="SentinelX Risk Engine",
            target=target,
            severity=severity,
            status="Open",
            description=recommendation,
        ))
    db.commit()

    return {
        "success": True,
        "target": target,
        "security_score": risk["score"],
        "risk_level": risk["risk"].capitalize(),
        "assessment_id": assessment.id,
        "recommendations": risk["recommendations"],
        "headers": headers,
        "ssl": ssl_result,
        "open_ports": ports,
        "nmap": nmap,
        "whois": whois_info,
        "dns": dns_info,
        "technology": technologies,
        "robots": robots,
        "sitemap": sitemap,
        "http_methods": methods,
        "server": server,
    }
