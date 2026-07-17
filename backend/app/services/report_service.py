from sqlalchemy.orm import Session

from app.models.assessment import Assessment
from app.models.finding import Finding


def generate_report(db: Session):

    total_assessments = db.query(Assessment).count()

    total_findings = db.query(Finding).count()

    critical = db.query(Finding).filter(
        Finding.severity == "Critical"
    ).count()

    high = db.query(Finding).filter(
        Finding.severity == "High"
    ).count()

    medium = db.query(Finding).filter(
        Finding.severity == "Medium"
    ).count()

    low = db.query(Finding).filter(
        Finding.severity == "Low"
    ).count()

    return {
        "generated_at": None,
        "total_assessments": total_assessments,
        "total_findings": total_findings,
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low,
    }