from pydantic import BaseModel


class AssessmentCreate(BaseModel):
    name: str
    target: str
    input_type: str


class AssessmentResponse(BaseModel):
    id: int
    name: str
    target: str
    input_type: str
    status: str

    class Config:
        from_attributes = True