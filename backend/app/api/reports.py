from fastapi import APIRouter, Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.report_service import generate_report
from app.services.pdf_service import generate_pdf

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/")
def get_report(db: Session = Depends(get_db)):
    return generate_report(db)


@router.get("/pdf")
def download_pdf(db: Session = Depends(get_db)):

    report = generate_report(db)

    pdf = generate_pdf(report)

    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition": 'attachment; filename="SentinelX_Report.pdf"'
        },
    )