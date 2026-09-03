from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import search_controller

app = FastAPI(title="Singlish Ad Recommender API")

# CORS — allow frontend dev servers and common local origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Controller එක සම්බන්ධ කිරීම
app.include_router(search_controller.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "AI Backend System is Running!"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}