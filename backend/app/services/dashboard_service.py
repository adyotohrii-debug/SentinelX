from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.assessment import Assessment
from app.models.finding import Finding
from app.services.security_service import get_tools_status


def get_dashboard_stats(db: Session, user_id: str = None):
    if user_id:
        assessment_filter = or_(Assessment.user_id == user_id, Assessment.user_id == None)
        total_assessments = db.query(Assessment).filter(assessment_filter).count()
        total_findings = db.query(Finding).join(Assessment).filter(assessment_filter).count()

        critical = db.query(Finding).join(Assessment).filter(
            Finding.severity == "Critical",
            assessment_filter
        ).count()

        high = db.query(Finding).join(Assessment).filter(
            Finding.severity == "High",
            assessment_filter
        ).count()

        medium = db.query(Finding).join(Assessment).filter(
            Finding.severity == "Medium",
            assessment_filter
        ).count()

        low = db.query(Finding).join(Assessment).filter(
            Finding.severity == "Low",
            assessment_filter
        ).count()

        owasp_findings = db.query(Finding).join(Assessment).filter(
            Finding.scanner.ilike("%OWASP%"),
            assessment_filter
        ).count()
    else:
        total_assessments = db.query(Assessment).count()
        total_findings = db.query(Finding).count()
        critical = db.query(Finding).filter(Finding.severity == "Critical").count()
        high = db.query(Finding).filter(Finding.severity == "High").count()
        medium = db.query(Finding).filter(Finding.severity == "Medium").count()
        low = db.query(Finding).filter(Finding.severity == "Low").count()
        owasp_findings = db.query(Finding).filter(Finding.scanner.ilike("%OWASP%")).count()

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