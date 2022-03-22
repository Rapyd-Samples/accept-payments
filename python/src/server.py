import uvicorn
from app import start_server
from config import appConfig


def app():
    return start_server()


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=appConfig.port, reload=True)
