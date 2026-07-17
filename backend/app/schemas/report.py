from pydantic import BaseModel
from datetime import datetime


class ReportResponse(BaseModel):
    id: int
    generated_at: datetime
    total_assessments: int
    total_findings: int
    critical: int
    high: int
    medium: int
    low: int