import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import local_host, local_port

from routers.router import api_router


app = FastAPI(title="Aster Systems API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run(app, host=local_host, port=int(local_port))
