#!/bin/bash
set -e

echo "🚀 Starting Astro frontend container..."

# Wait for Strapi to be ready
echo "⏳ Waiting for Strapi to be available at ${STRAPI_URL}..."
STRAPI_HOST=$(echo $STRAPI_URL | sed -E 's|https?://([^:/]+).*|\1|')
STRAPI_PORT=$(echo $STRAPI_URL | sed -E 's|https?://[^:]+:([0-9]+).*|\1|')

# Default to 1337 if no port specified
if [ "$STRAPI_PORT" = "$STRAPI_URL" ]; then
    STRAPI_PORT="1337"
fi

MAX_ATTEMPTS=60
ATTEMPT=0

until curl -sf "http://${STRAPI_HOST}:${STRAPI_PORT}/admin" > /dev/null 2>&1; do
    ATTEMPT=$((ATTEMPT + 1))
    if [ $ATTEMPT -ge $MAX_ATTEMPTS ]; then
        echo "❌ Strapi failed to start after ${MAX_ATTEMPTS} attempts"
        echo "⚠️  Building without Strapi data (pages will be empty)"
        break
    fi
    echo "  Attempt ${ATTEMPT}/${MAX_ATTEMPTS} - waiting for Strapi..."
    sleep 2
done

if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
    echo "✅ Strapi is ready!"
fi

# Build Astro site
echo "🎨 Building Astro site..."
cd /app
npm run build

# Copy built files to nginx
echo "📦 Deploying to nginx..."
rm -rf /usr/share/nginx/html/*
cp -r /app/dist/* /usr/share/nginx/html/

echo "✨ Build complete! Starting nginx..."

# Start nginx
exec nginx -g 'daemon off;'
