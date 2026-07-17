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


def normalize_target(target: str):
    """
    Returns hostname only.
    https://example.com -> example.com
    """

    if not target.startswith("http"):
        target = "https://" + target

    parsed = urlparse(target)

    return parsed.hostname


def check_headers(target: str):

    result = {}

    try:
        response = requests.get(
            target,
            timeout=3.5
        )

        headers = response.headers

        security_headers = [
            "Content-Security-Policy",
            "Strict-Transport-Security",
            "X-Frame-Options",
            "X-Content-Type-Options",
            "Referrer-Policy",
            "Permissions-Policy"
        ]

        for h in security_headers:
            result[h] = headers.get(h, "Missing")

    except Exception as e:

        result["error"] = str(e)

    return result


def check_ssl(target: str):

    hostname = normalize_target(target)

    try:

        context = ssl.create_default_context()

        with context.wrap_socket(
            socket.socket(),
            server_hostname=hostname
        ) as s:

            s.settimeout(3.0)

            s.connect((hostname, 443))

            cert = s.getpeercert()

            return {
                "status": "Valid",
                "issuer": cert.get("issuer"),
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

            sock = socket.socket()

            sock.settimeout(0.5)

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