from sqlalchemy.orm import Session

from app.models.assessment import Assessment
from app.models.finding import Finding
from app.services.security_service import get_tools_status


def get_dashboard_stats(db: Session, user_id: str = None):
    if user_id:
        total_assessments = db.query(Assessment).filter(Assessment.user_id == user_id).count()
        total_findings = db.query(Finding).join(Assessment).filter(Assessment.user_id == user_id).count()

        critical = db.query(Finding).join(Assessment).filter(
            Finding.severity == "Critical",
            Assessment.user_id == user_id
        ).count()

        high = db.query(Finding).join(Assessment).filter(
            Finding.severity == "High",
            Assessment.user_id == user_id
        ).count()

        medium = db.query(Finding).join(Assessment).filter(
            Finding.severity == "Medium",
            Assessment.user_id == user_id
        ).count()

        low = db.query(Finding).join(Assessment).filter(
            Finding.severity == "Low",
            Assessment.user_id == user_id
        ).count()

        owasp_findings = db.query(Finding).join(Assessment).filter(
            Finding.scanner.ilike("%OWASP%"),
            Assessment.user_id == user_id
        ).count()
    else:
        total_assessments = 0
        total_findings = 0
        critical = 0
        high = 0
        medium = 0
        low = 0
        owasp_findings = 0

    return {
        "total_assessments": total_assessments,
        "total_findings": total_findings,
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low,
        "owasp_findings": owasp_findings,
        "tools_status": get_tools_status(),
    }