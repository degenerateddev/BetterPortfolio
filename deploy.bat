@echo off
echo Starting deployment process...

REM Step 1: Build and start Strapi
echo Building and starting Strapi...
docker-compose up -d --build strapi

REM Step 2: Wait for Strapi to be ready
echo Waiting for Strapi to initialize...
echo This may take 30-60 seconds...

:wait_loop
timeout /t 2 /nobreak >nul
curl -s http://localhost:1337/admin >nul 2>&1
if errorlevel 1 (
    echo|set /p=.
    goto wait_loop
)

echo.
echo Strapi is ready!

REM Step 3: Build and start Astro frontend
echo Building Astro frontend (fetching data from Strapi)...
docker-compose up -d --build frontend

echo.
echo Deployment complete!
echo.
echo Your application is ready:
echo   Frontend: http://localhost:3000
echo   Strapi:   http://localhost:1337/admin
echo.
echo View logs with:
echo   docker-compose logs -f
