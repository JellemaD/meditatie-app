"""Zet een bestand als versleuteld GitHub Actions-secret in een repo.

Gebruik:  python tools/github_secret.py <owner/repo> <SECRET_NAAM> <pad-naar-bestand>
Token komt uit Git Credential Manager (git credential fill), net als bij de andere projecten.
"""
import base64
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

from nacl import encoding, public


def token():
    uit = subprocess.run(["git", "credential", "fill"], input="protocol=https\nhost=github.com\n\n",
                         capture_output=True, text=True, check=True).stdout
    return next(r.split("=", 1)[1] for r in uit.splitlines() if r.startswith("password="))


def api(methode, pad, t, data=None):
    req = urllib.request.Request(f"https://api.github.com{pad}", method=methode,
                                 data=json.dumps(data).encode() if data else None,
                                 headers={"Authorization": f"Bearer {t}", "Accept": "application/vnd.github+json"})
    with urllib.request.urlopen(req) as r:
        body = r.read()
        return r.status, (json.loads(body) if body else None)


def main(repo, naam, bestand):
    t = token()
    _, sleutel = api("GET", f"/repos/{repo}/actions/secrets/public-key", t)
    doos = public.SealedBox(public.PublicKey(sleutel["key"].encode(), encoding.Base64Encoder()))
    geheim = base64.b64encode(doos.encrypt(Path(bestand).read_bytes())).decode()
    status, _ = api("PUT", f"/repos/{repo}/actions/secrets/{naam}", t,
                    {"encrypted_value": geheim, "key_id": sleutel["key_id"]})
    print(f"{naam} in {repo}: HTTP {status}")


if __name__ == "__main__":
    main(*sys.argv[1:4])
