#!/bin/bash
# Script para sincronizar env vars do GitHub Secrets para o Render
# Uso: RENDER_API_KEY=x GH_TOKEN=x ./scripts/sync-env.sh
curl -s -X PUT "https://api.render.com/v1/services/srv-d9hba8faqgkc73a1bcp0/env-vars" \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "envVars": [
      {"key": "NEXT_PUBLIC_SUPABASE_URL", "value": "'"$SUPABASE_URL"'"},
      {"key": "NEXT_PUBLIC_SUPABASE_ANON_KEY", "value": "'"$SUPABASE_ANON_KEY"'"},
      {"key": "NEXT_PUBLIC_CHURCH_NAME", "value": "Assembleia de Deus - Igreja Campo do Planalto"},
      {"key": "NEXT_PUBLIC_CHURCH_CITY", "value": "Laranjal do Jari"},
      {"key": "NEXT_PUBLIC_CHURCH_STATE", "value": "AP"},
      {"key": "NEXT_PUBLIC_CHURCH_PHONE", "value": "(96) 99166-2185"}
    ]
  }'