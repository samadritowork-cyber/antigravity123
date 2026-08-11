from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.core.disclaimer import get_disclaimer
from backend.app.core.logging import logger

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "FinSight API — Production Financial Intelligence & Risk Analytics Platform.\n\n"
        "**Educational Disclaimer**: FinSight is built exclusively for quantitative research and education. "
        "It does not provide personalized investment advice."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["System"])
async def health_check():
    """Health check endpoint to verify backend operational status."""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
    }


@app.get("/disclaimer", tags=["System"])
async def read_disclaimer():
    """Returns official quantitative & financial disclaimer."""
    return get_disclaimer()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
