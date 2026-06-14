#!/bin/bash
# Stevin SEO maintenance, token-vrij. Draait via launchd op de altijd-aan Mac mini,
# zonder Claude-app. Health- en schema-checks werken puur via curl plus node en
# hebben de repo niet nodig. IndexNow en npm audit gebruiken deze repo.
#
# Het script leidt de repo-locatie af uit zijn eigen pad, dus het werkt waar je de
# repo ook cloont. Override desgewenst met de env-var STEVIN_SITE_REPO.
#
# Installeren als launchd-job: zie scripts/ai.stevin.seo-maintenance.plist.
# Log: ~/Library/Logs/stevin-seo-maintenance.log

set -uo pipefail

# launchd geeft een kale PATH, dus expliciet de tools-locaties meegeven.
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
REPO="${STEVIN_SITE_REPO:-$(cd "$SCRIPT_DIR/.." && pwd)}"
LOG_DIR="$HOME/Library/Logs"
LOG="$LOG_DIR/stevin-seo-maintenance.log"
mkdir -p "$LOG_DIR"

ts() { date '+%Y-%m-%d %H:%M:%S'; }
log() { echo "[$(ts)] $1" >> "$LOG"; }
fail=0

log "=== run start (repo: ${REPO}) ==="

# 1. Health-check (geen repo nodig)
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

# 2. JSON-LD parse-check op kernpagina's (via node, geen repo nodig)
if command -v node >/dev/null 2>&1; then
  for page in / /platform /simon-stevin /woordenboek; do
    html=$(curl -s --max-time 20 "https://stevin.ai${page}")
    result=$(printf '%s' "$html" | node -e '
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
else
  log "node niet gevonden, schema-check overgeslagen"
fi

# 3. Repo-acties: IndexNow pingen + npm audit (alleen als de repo aanwezig is)
if [ -d "$REPO/.git" ]; then
  cd "$REPO" || exit 1
  git pull --ff-only >>"$LOG" 2>&1 || log "git pull overgeslagen (geen fast-forward of auth)"
  if command -v npm >/dev/null 2>&1; then
    if npm run indexnow >>"$LOG" 2>&1; then
      log "indexnow ok"
    else
      log "INDEXNOW FAIL (node_modules geinstalleerd?)"
      fail=1
    fi
    audit=$(npm audit --audit-level=high 2>&1 | tail -3 | tr '\n' ' ')
    log "npm audit (high+): ${audit}"
  else
    log "npm niet gevonden in PATH"
  fi
else
  log "repo niet gevonden op ${REPO}, IndexNow en audit overgeslagen. Zet STEVIN_SITE_REPO of clone de repo en draai npm install."
fi

if [ "$fail" -eq 0 ]; then
  log "=== run einde, status: OK ==="
else
  log "=== run einde, status: AANDACHT ==="
  osascript -e 'display notification "Bekijk ~/Library/Logs/stevin-seo-maintenance.log" with title "Stevin SEO maintenance: aandacht nodig"' 2>/dev/null || true
fi

exit 0
