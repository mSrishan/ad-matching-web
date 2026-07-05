from pydantic import BaseModel
from typing import List

# Frontend එකෙන් එන Request එක
class SearchRequest(BaseModel):
    query: str
    top_k: int = 5

# තනි Ad එකක් පෙන්වන විදිය
class AdResult(BaseModel):
    id: str
    text: str
    similarity_score: float

# Frontend එකට යවන සම්පූර්ණ JSON Response එක (View)
class SearchResponse(BaseModel):
    query: str
    results: List[AdResult]