from pydantic import BaseModel


class DashboardResponse(BaseModel):
    total_assessments: int
    total_findings: int
    critical: int
    high: int
    medium: int
    low: int