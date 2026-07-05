from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import search_controller

app = FastAPI(title="Singlish Ad Recommender API")

# Next.js (Frontend) එකට මේ API එකට කතා කරන්න අවසර දීම (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Next.js දුවන තැන
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Controller එක සම්බන්ධ කිරීම
app.include_router(search_controller.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "AI Backend System is Running!"}