from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime

from app.core.database import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    target = Column(String, nullable=False)

    input_type = Column(String, nullable=False)

    status = Column(String, default="Pending")

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    raw_results = Column(
        Text,
        nullable=True
    )

    user_id = Column(
        String,
        nullable=True,
        index=True
    )