import socket
import ssl
import requests
import shutil
import subprocess
from urllib.parse import urlparse


COMMON_PORTS = [
    21, 22, 23, 25, 53,
    80, 110, 143, 443,
    3306, 3389, 8080
]


def normalize_url(target: str) -> str:
    """Ensure target URL has proper scheme and no trailing slash."""
    target = target.strip().rstrip("/")
    if not target.startswith("http://") and not target.startswith("https://"):
        target = "https://" + target
    return target


def normalize_target(target: str) -> str:
    """Returns hostname only for socket / DNS operations."""
    url = normalize_url(target)
    parsed = urlparse(url)
    return parsed.hostname or target.strip()


def check_headers(target: str):
    result = {}
    url = normalize_url(target)
    headers_to_check = [
        "Content-Security-Policy",
        "Strict-Transport-Security",
        "X-Frame-Options",
        "X-Content-Type-Options",
        "Referrer-Policy",
        "Permissions-Policy"
    ]

    try:
        response = requests.get(
            url,
            timeout=5.0,
            allow_redirects=True,
            headers={"User-Agent": "SentinelX-Security-Scanner/2.0"}
        )
        resp_headers = response.headers

        for h in headers_to_check:
            # Case-insensitive header lookup
            val = None
            for hk, hv in resp_headers.items():
                if hk.lower() == h.lower():
                    val = hv
                    break
            result[h] = val if val else "Missing"

    except Exception as e:
        for h in headers_to_check:
            result[h] = "Missing"
        result["error"] = str(e)

    return result


def parse_issuer(issuer_tuple):
    if not issuer_tuple:
        return {}
    result = {}
    try:
        for item in issuer_tuple:
            for key, value in item:
                result[key] = value
    except Exception:
        pass
    return result


def check_ssl(target: str):
    hostname = normalize_target(target)

    try:
        context = ssl.create_default_context()
        with context.wrap_socket(
            socket.socket(),
            server_hostname=hostname
        ) as s:
            s.settimeout(5.0)
            s.connect((hostname, 443))
            cert = s.getpeercert()
            issuer_data = parse_issuer(cert.get("issuer"))

            return {
                "status": "Valid",
                "issuer": issuer_data,
                "expires": cert.get("notAfter")
            }

    except Exception as e:
        return {
            "status": "Unavailable",
            "error": str(e)
        }


def scan_ports(target: str):
    hostname = normalize_target(target)
    open_ports = []

    for port in COMMON_PORTS:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(0.6)
            if sock.connect_ex((hostname, port)) == 0:
                open_ports.append(port)
            sock.close()
        except Exception:
            pass

    return open_ports


def detect_nmap():
    return shutil.which("nmap") is not None


def run_nmap(target: str):
    if not detect_nmap():
        return {
            "installed": False,
            "message": "Nmap not installed."
        }

    hostname = normalize_target(target)

    try:
        result = subprocess.run(
            [
                "nmap",
                "-F",
                hostname
            ],
            capture_output=True,
            text=True,
            timeout=60
        )

        return {
            "installed": True,
            "output": result.stdout
        }

    except Exception as e:
        return {
            "installed": True,
            "error": str(e)
        }


def detect_zap():
    """Check if OWASP ZAP binary exists on the system."""
    for binary in ["zap.sh", "zap.bat", "zaproxy", "zap"]:
        if shutil.which(binary) is not None:
            return True
    return False


def check_zap_running(base_url: str = "http://127.0.0.1:8080"):
    """Check if OWASP ZAP REST API is reachable."""
    try:
        response = requests.get(f"{base_url}/JSON/core/view/version/", timeout=1.5)
        return response.status_code == 200
    except Exception:
        try:
            response = requests.get(base_url, timeout=1.5)
            return response.status_code in [200, 403, 401]
        except Exception:
            return False


def get_tools_status():
    """Return backend status for Nmap and OWASP ZAP."""
    nmap_ok = detect_nmap()
    zap_installed = detect_zap()
    zap_running = check_zap_running()

    return {
        "nmap_installed": nmap_ok,
        "zap_installed": zap_installed,
        "zap_running": zap_running,
        "zap_available": zap_running,
        "message": (
            "OWASP ZAP is online and reachable."
            if zap_running
            else "OWASP ZAP is not installed or not running. Advanced vulnerability scanning is unavailable. All other SentinelX security assessment features remain fully functional."
        )
    }