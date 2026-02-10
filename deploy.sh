#!/bin/bash

echo "🚀 Starting deployment process..."

# Step 1: Build and start Strapi
echo "📦 Building and starting Strapi..."
docker-compose up -d --build strapi

# Step 2: Wait for Strapi to be ready
echo "⏳ Waiting for Strapi to initialize..."
echo "   This may take 30-60 seconds..."

until curl -s http://localhost:1337/admin > /dev/null 2>&1; do
  echo -n "."
  sleep 2
done

echo ""
echo "✅ Strapi is ready!"

# Step 3: Build and start Astro frontend
echo "🎨 Building Astro frontend (fetching data from Strapi)..."
docker-compose up -d --build frontend

echo ""
echo "✨ Deployment complete!"
echo ""
echo "📍 Your application is ready:"
echo "   Frontend: http://localhost:3000"
echo "   Strapi:   http://localhost:1337/admin"
echo ""
echo "📋 View logs with:"
echo "   docker-compose logs -f"
