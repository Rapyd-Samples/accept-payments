from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from api.router import api_router


class DynamicCORSMiddleware(CORSMiddleware):
    def is_allowed_origin(self, origin: str) -> bool:
        return True


def start_server():

    app = FastAPI(docs_url="/api/docs", redoc_url="/api/redocs",
                  openapi_url="/api/openapi.json")
    app.include_router(api_router)

    app.add_middleware(
        DynamicCORSMiddleware,
        allow_origins=[],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
