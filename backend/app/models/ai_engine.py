# app/models/ai_engine.py
import os
import json
import faiss
import pandas as pd
from sentence_transformers import SentenceTransformer

class AIEngine:
    def __init__(self):
        # paths සැකසීම
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.model = SentenceTransformer(os.path.join(base_dir, '../../singlish-sbert-model'))
        
        # Resources load කිරීම
        res_dir = os.path.join(base_dir, '../../resources')
        self.index = faiss.read_index(os.path.join(res_dir, 'ad_faiss_index.bin'))
        self.corpus_df = pd.read_csv(os.path.join(res_dir, 'corpus_metadata.csv'))
        
        with open(os.path.join(res_dir, 'variant_to_canonical.json'), 'r', encoding='utf-8') as f:
            self.variant_to_canonical = json.load(f)
            

    def normalize(self, text):
        # Singlish variant normalization: replace known variants with canonical forms
        text = text.lower()
        tokens = text.split()
        normalized_tokens = [self.variant_to_canonical.get(t, t) for t in tokens]
        return " ".join(normalized_tokens)

    def search(self, query: str, top_k: int = 5):
        norm_query = self.normalize(query)
        embedding = self.model.encode([norm_query], normalize_embeddings=True).astype("float32")
        scores, indices = self.index.search(embedding, top_k)
        
        results = []
        for s, i in zip(scores[0], indices[0]):
            if i != -1: # FAISS index එකේ valid දත්ත විතරක් ගන්න
                # original_text එක ලබාගන්න (ඔයාගේ CSV එකේ තියෙන නම හරියටම දෙන්න)
                ad_text = self.corpus_df.iloc[i]['original_text'] 
                
                results.append({
                    "id": str(i), # Index එකම ID එක විදියට දාන්න
                    "text": ad_text,
                    "similarity_score": round(float(s) * 100, 2)
                })
        return results

ai_engine = AIEngine()