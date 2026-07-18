from fastapi import APIRouter, Depends, Header
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional

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
def run_security_scan(
    data: SecurityRequest, 
    db: Session = Depends(get_db), 
    x_user_id: Optional[str] = Header(None)
):

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
            headers = future_headers.result()
        except Exception:
            headers = {}

        try:
            ssl_result = future_ssl.result()
        except Exception:
            ssl_result = {"status": "Unavailable"}

        try:
            ports = future_ports.result()
        except Exception:
            ports = []

        try:
            nmap = future_nmap.result()
        except Exception:
            nmap = {"installed": False, "message": "Nmap scan failed."}

        try:
            whois_info = future_whois.result()
        except Exception:
            whois_info = {"error": "WHOIS lookup failed."}

        try:
            dns_info = future_dns.result()
        except Exception:
            dns_info = {"A": [], "MX": [], "NS": []}

        try:
            technologies = future_tech.result()
        except Exception:
            technologies = {}

        try:
            robots = future_robots.result()
        except Exception:
            robots = {"found": False}

        try:
            sitemap = future_sitemap.result()
        except Exception:
            sitemap = {"found": False}

        try:
            methods = future_methods.result()
        except Exception:
            methods = {}

        try:
            server = future_server.result()
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
        raw_results=json.dumps(full_report),
        user_id=x_user_id
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
