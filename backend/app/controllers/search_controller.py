from fastapi import APIRouter
from app.models.schemas import SearchRequest, SearchResponse, AdResult
from app.models.ai_engine import ai_engine

# Router එක හදාගැනීම
router = APIRouter()

@router.post("/search", response_model=SearchResponse)
async def perform_search(request: SearchRequest):
    # Model (ai_engine) එකට කතා කරලා දත්ත ඉල්ලනවා
    raw_results = ai_engine.search(query=request.query, top_k=request.top_k)
    
    # ආපු දත්ත ටික Response Schema (View) එකට හරවනවා
    formatted_results = [
        AdResult(
            id=res["id"],
            text=res["text"],
            similarity_score=res["similarity_score"]
        ) for res in raw_results
    ]
    
    # අවසාන ප්‍රතිඵලය Frontend එකට යවනවා
    return SearchResponse(
        query=request.query,
        results=formatted_results
    )