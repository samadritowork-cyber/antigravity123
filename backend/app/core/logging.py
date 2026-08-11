import logging
import sys
from backend.app.core.config import settings


def setup_logging():
    """Configure structured logging for FinSight backend."""
    log_level = logging.DEBUG if settings.DEBUG else logging.INFO

    logging.basicConfig(
        level=log_level,
        format="%(asctime)s | %(levelname)-8s | %(name)s:%(funcName)s:%(lineno)d - %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )

    logger = logging.getLogger("finsight")
    logger.info(f"Initialized logging for {settings.PROJECT_NAME} [{settings.ENVIRONMENT}]")
    return logger


logger = setup_logging()
