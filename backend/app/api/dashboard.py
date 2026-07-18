from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database import SessionLocal
from app.services.dashboard_service import get_dashboard_stats

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    x_user_id: Optional[str] = Header(None)
):
    return get_dashboard_stats(db, x_user_id)
    