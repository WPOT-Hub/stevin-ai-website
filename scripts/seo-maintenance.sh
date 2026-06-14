#!/bin/bash
# Stevin SEO maintenance, token-vrij en REPO-ONAFHANKELIJK. Draait via launchd op
# de altijd-aan Mac mini, zonder Claude-app, zonder de repo en zonder npm install.
# Nodig: alleen curl en node.
#
# Doet: health-check, JSON-LD parse-validatie op kernpagina's, en IndexNow-ping
# voor recent gewijzigde blog-URLs (uit de live sitemap, lastmod < 7 dagen).
# npm audit zit bewust NIET hier: dat doet de wekelijkse Claude-audit op de laptop.
#
# Log: ~/Library/Logs/stevin-seo-maintenance.log

set -uo pipefail
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

LOG="$HOME/Library/Logs/stevin-seo-maintenance.log"
mkdir -p "$HOME/Library/Logs"
ts() { date '+%Y-%m-%d %H:%M:%S'; }
log() { echo "[$(ts)] $1" >> "$LOG"; }
fail=0

log "=== run start ==="

# 1. Health-check
for path in / /sitemap.xml /robots.txt /feed.xml /llms.txt /pricing.md; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://stevin.ai${path}")
  if [ "$code" = "200" ]; then
    log "health ok ${path}"
  else
    log "HEALTH FAIL ${path} -> ${code}"
    fail=1
  fi
done

locs=$(curl -s --max-time 20 https://stevin.ai/sitemap.xml | grep -c '<loc>')
log "sitemap locs: ${locs}"
if [ "${locs:-0}" -lt 400 ]; then
  log "SITEMAP WAARSCHUWING: minder dan 400 locs (${locs}), mogelijk regressie"
  fail=1
fi

if ! command -v node >/dev/null 2>&1; then
  log "node niet gevonden, schema- en IndexNow-stap overgeslagen"
  log "=== run einde, status: AANDACHT ==="
  exit 0
fi

# 2. JSON-LD parse-check op kernpagina's
for page in / /platform /simon-stevin /woordenboek; do
  result=$(curl -s --max-time 20 "https://stevin.ai${page}" | node -e '
    let s="";
    process.stdin.on("data", d => s += d).on("end", () => {
      const m = [...s.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
      let bad = 0;
      for (const x of m) { try { JSON.parse(x[1]); } catch (e) { bad++; } }
      console.log(m.length + " blocks, " + bad + " parse-fouten");
    });
  ' 2>/dev/null)
  log "schema ${page}: ${result:-geen output}"
  case "$result" in
    *"0 parse-fouten"*) : ;;
    *) log "SCHEMA AANDACHT ${page}"; fail=1 ;;
  esac
done

# 3. IndexNow: ping blog-URLs met lastmod < 7 dagen, rechtstreeks uit de sitemap
indexnow=$(node -e '
  (async () => {
    const KEY = "f8320e5bf8a4f23276040719d8a9548f";
    const sm = await (await fetch("https://stevin.ai/sitemap.xml")).text();
    const cutoff = Date.now() - 7 * 24 * 3600 * 1000;
    const urls = [];
    for (const block of sm.split("<url>")) {
      const loc = (block.match(/<loc>(https:\/\/stevin\.ai\/blog\/[^<]+)<\/loc>/) || [])[1];
      const lm = (block.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1];
      if (loc && lm && new Date(lm).getTime() >= cutoff) urls.push(loc);
    }
    if (urls.length === 0) { console.log("geen nieuwe blog-URLs in 7 dagen"); return; }
    const body = { host: "stevin.ai", key: KEY, keyLocation: "https://stevin.ai/" + KEY + ".txt", urlList: urls };
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    console.log(urls.length + " URLs, status " + r.status);
  })().catch(e => { console.log("FAIL " + e.message); });
' 2>/dev/null)
log "indexnow: ${indexnow:-geen output}"
case "$indexnow" in
  *"status 200"*|*"status 202"*|*"geen nieuwe"*) : ;;
  *) log "INDEXNOW AANDACHT"; fail=1 ;;
esac

if [ "$fail" -eq 0 ]; then
  log "=== run einde, status: OK ==="
else
  log "=== run einde, status: AANDACHT ==="
  osascript -e 'display notification "Bekijk ~/Library/Logs/stevin-seo-maintenance.log" with title "Stevin SEO maintenance: aandacht nodig"' 2>/dev/null || true
fi

exit 0
