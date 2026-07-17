from pydantic import BaseModel


class WebsiteScanRequest(BaseModel):
    target: str


class IPScanRequest(BaseModel):
    target: str