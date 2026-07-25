from datetime import datetime
from sqlalchemy.orm import Session

from app.models.assessment import Assessment
from app.models.finding import Finding
from app.services.security_service import get_tools_status


def generate_report(db: Session, user_id: str = None):
    if user_id:
        assessments = db.query(Assessment).filter(Assessment.user_id == user_id).all()
        findings = db.query(Finding).join(Assessment).filter(Assessment.user_id == user_id).all()

        total_assessments = len(assessments)
        total_findings = len(findings)

        critical = sum(1 for f in findings if f.severity == "Critical")
        high = sum(1 for f in findings if f.severity == "High")
        medium = sum(1 for f in findings if f.severity == "Medium")
        low = sum(1 for f in findings if f.severity == "Low")
        owasp_count = sum(1 for f in findings if "owasp" in (f.scanner or "").lower())
    else:
        total_assessments = 0
        total_findings = 0
        critical = 0
        high = 0
        medium = 0
        low = 0
        owasp_count = 0
        findings = []

    return {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "total_assessments": total_assessments,
        "total_findings": total_findings,
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low,
        "owasp_findings": owasp_count,
        "tools_status": get_tools_status(),
        "findings_list": [
            {
                "scanner": f.scanner,
                "target": f.target,
                "severity": f.severity,
                "description": f.description,
            }
            for f in findings[:20]
        ]
    }