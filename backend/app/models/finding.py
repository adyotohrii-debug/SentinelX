from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
)
from sqlalchemy.sql import func

from app.core.database import Base


class Finding(Base):
    __tablename__ = "findings"

    id = Column(Integer, primary_key=True, index=True)

    assessment_id = Column(
        Integer,
        ForeignKey("assessments.id"),
        nullable=False,
    )

    scanner = Column(String, nullable=False)

    target = Column(String, nullable=False)

    port = Column(String)

    service = Column(String)

    severity = Column(String)

    status = Column(String)

    description = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )