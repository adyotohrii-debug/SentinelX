from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.assessment import Assessment
from app.models.finding import Finding

from app.schemas.upload import (
    WebsiteScanRequest,
    IPScanRequest,
)

from app.services.upload_service import (
    save_uploaded_file,
    process_website,
    process_ip,
)

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/file")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected."
        )

    result = save_uploaded_file(file)
    if result.get("success"):
        import json
        assessment = Assessment(
            name=f"Imported scan — {file.filename}",
            target=result.get("target") or file.filename,
            input_type="Imported file",
            status="Completed",
            raw_results=json.dumps(result),
        )
        db.add(assessment)
        db.flush()
        for item in result.get("findings", []):
            risk = str(item.get("risk", "Medium"))
            severity = next((level for level in ("Critical", "High", "Medium", "Low") if level.lower() in risk.lower()), "Medium")
            db.add(Finding(
                assessment_id=assessment.id,
                scanner=item.get("scanner", result.get("scanner", "Imported scan")),
                target=item.get("site") or item.get("ip") or file.filename,
                port=item.get("port"),
                service=item.get("service"),
                severity=severity,
                status=item.get("status", "Open"),
                description=item.get("description") or item.get("title") or "Imported scan finding",
            ))
        db.commit()
        result["assessment_id"] = assessment.id
    return result


@router.post("/website")
async def upload_website(data: WebsiteScanRequest):

    if not data.target.strip():
        raise HTTPException(
            status_code=400,
            detail="Website URL is required."
        )

    return process_website(data.target)


@router.post("/ip")
async def upload_ip(data: IPScanRequest):

    if not data.target.strip():
        raise HTTPException(
            status_code=400,
            detail="IP Address is required."
        )

    return process_ip(data.target)
