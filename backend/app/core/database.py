from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite Database
DATABASE_URL = "sqlite:///./sentinelx.db"

# Engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base Class
Base = declarative_base()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()