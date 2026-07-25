from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import get_db
from app.models.assessment import Assessment
from app.models.finding import Finding
from app.schemas.assessment import AssessmentCreate

router = APIRouter(
    prefix="/assessments",
    tags=["Assessments"]
)


@router.get("/")
def get_assessments(
    db: Session = Depends(get_db),
    x_user_id: Optional[str] = Header(None)
):
    if x_user_id:
        return db.query(Assessment).filter(Assessment.user_id == x_user_id).all()
    return db.query(Assessment).all()


@router.get("/{assessment_id}")
def get_assessment(
    assessment_id: int, 
    db: Session = Depends(get_db),
    x_user_id: Optional[str] = Header(None)
):
    import json
    query = db.query(Assessment).filter(Assessment.id == assessment_id)
    if x_user_id:
        query = query.filter(Assessment.user_id == x_user_id)
    
    assessment = query.first()
    if not assessment:
        return {"message": "Assessment not found"}
    findings = db.query(Finding).filter(Finding.assessment_id == assessment_id).all()
    
    raw_res = None
    if assessment.raw_results:
        try:
            raw_res = json.loads(assessment.raw_results)
        except Exception:
            pass

    return {
        "id": assessment.id,
        "name": assessment.name,
        "target": assessment.target,
        "input_type": assessment.input_type,
        "status": assessment.status,
        "created_at": assessment.created_at,
        "raw_results": raw_res,
        "findings": [{
            "id": finding.id,
            "scanner": finding.scanner,
            "severity": finding.severity,
            "status": finding.status,
            "description": finding.description,
        } for finding in findings],
    }


@router.post("/")
def create_assessment(
    assessment: AssessmentCreate,
    db: Session = Depends(get_db),
    x_user_id: Optional[str] = Header(None)
):
    new_assessment = Assessment(
        name=assessment.name,
        target=assessment.target,
        input_type=assessment.input_type,
        user_id=x_user_id
    )

    db.add(new_assessment)
    db.commit()
    db.refresh(new_assessment)

    return new_assessment


@router.put("/{assessment_id}")
def update_assessment(
    assessment_id: int,
    assessment: AssessmentCreate,
    db: Session = Depends(get_db),
    x_user_id: Optional[str] = Header(None)
):
    query = db.query(Assessment).filter(Assessment.id == assessment_id)
    if x_user_id:
        query = query.filter(Assessment.user_id == x_user_id)
    existing = query.first()

    if not existing:
        return {"message": "Assessment not found"}

    existing.name = assessment.name
    existing.target = assessment.target
    existing.input_type = assessment.input_type

    db.commit()
    db.refresh(existing)

    return existing


@router.delete("/{assessment_id}")
def delete_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    x_user_id: Optional[str] = Header(None)
):
    query = db.query(Assessment).filter(Assessment.id == assessment_id)
    if x_user_id:
        query = query.filter(Assessment.user_id == x_user_id)
    
    assessment = query.first()

    if not assessment:
        return {"message": "Assessment not found"}

    db.query(Finding).filter(Finding.assessment_id == assessment_id).delete()
    db.delete(assessment)
    db.commit()

    return {"message": "Assessment deleted successfully"}
