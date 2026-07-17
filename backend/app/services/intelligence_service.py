import requests
import whois
import dns.resolver

from urllib.parse import urlparse


def normalize_target(target: str):
    if not target.startswith("http"):
        target = "https://" + target

    parsed = urlparse(target)
    return target, parsed.hostname


def get_whois(target):
    _, hostname = normalize_target(target)

    try:
        data = whois.whois(hostname)

        return {
            "domain": hostname,
            "registrar": str(data.registrar),
            "creation_date": str(data.creation_date),
            "expiration_date": str(data.expiration_date),
        }

    except Exception as e:
        return {"error": str(e)}


def get_dns(target):
    _, hostname = normalize_target(target)

    result = {
        "A": [],
        "MX": [],
        "NS": [],
    }

    try:
        result["A"] = [
            str(x)
            for x in dns.resolver.resolve(hostname, "A")
        ]
    except Exception:
        pass

    try:
        result["MX"] = [
            str(x.exchange)
            for x in dns.resolver.resolve(hostname, "MX")
        ]
    except Exception:
        pass

    try:
        result["NS"] = [
            str(x)
            for x in dns.resolver.resolve(hostname, "NS")
        ]
    except Exception:
        pass

    return result


def get_technology(target):
    technologies = {}
    try:
        response = requests.get(target, timeout=3.5)
        headers = response.headers
        server = headers.get("Server", "").lower()
        powered = headers.get("X-Powered-By", "").lower()
        body = response.text.lower()
        
        if "nginx" in server: technologies["web-servers"] = ["Nginx"]
        elif "apache" in server: technologies["web-servers"] = ["Apache"]
        elif "cloudflare" in server: technologies["web-servers"] = ["Cloudflare"]
        elif "iis" in server: technologies["web-servers"] = ["IIS"]

        if "php" in powered or "php" in server: technologies["programming-languages"] = ["PHP"]
        elif "asp.net" in powered: technologies["frameworks"] = ["ASP.NET"]
        elif "express" in powered: technologies["frameworks"] = ["Express"]
        elif "next.js" in powered or "nextjs" in body: technologies["frameworks"] = ["Next.js"]

        if "wp-content" in body or "wordpress" in body: technologies["cms"] = ["WordPress"]
        elif "drupal" in body: technologies["cms"] = ["Drupal"]
        elif "joomla" in body: technologies["cms"] = ["Joomla"]
        
        if "react" in body: technologies["javascript-libraries"] = ["React"]
        if "jquery" in body: technologies["javascript-libraries"] = ["jQuery"]
        if "vue" in body: technologies["javascript-libraries"] = ["Vue.js"]
    except Exception as e:
        return {"error": str(e)}
    return technologies


def check_robots(target):
    url, _ = normalize_target(target)

    try:
        response = requests.get(
            f"{url}/robots.txt",
            timeout=3.5
        )

        return {
            "found": response.status_code == 200,
            "status_code": response.status_code,
            "content": response.text[:1000],
        }

    except Exception as e:
        return {
            "found": False,
            "error": str(e),
        }


def check_sitemap(target):
    url, _ = normalize_target(target)

    try:
        response = requests.get(
            f"{url}/sitemap.xml",
            timeout=3.5
        )

        return {
            "found": response.status_code == 200,
            "status_code": response.status_code,
            "content": response.text[:1000],
        }

    except Exception as e:
        return {
            "found": False,
            "error": str(e),
        }


def get_http_methods(target):
    url, _ = normalize_target(target)

    try:
        response = requests.options(
            url,
            timeout=3.5
        )

        return {
            "allowed_methods": response.headers.get(
                "Allow",
                "Unknown"
            )
        }

    except Exception as e:
        return {"error": str(e)}


def get_server_information(target):
    url, _ = normalize_target(target)

    try:
        response = requests.get(
            url,
            timeout=3.5
        )

        return {
            "server": response.headers.get(
                "Server",
                "Unknown"
            ),
            "powered_by": response.headers.get(
                "X-Powered-By",
                "Unknown"
            ),
        }

    except Exception as e:
        return {"error": str(e)}