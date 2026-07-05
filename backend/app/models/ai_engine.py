from sentence_transformers import SentenceTransformer, util
import torch

class AIEngine:
    def __init__(self):
        # 1. අපි පුහුණු කරපු මොඩල් එක Load කරගැනීම 
        # (ඇත්තම ප්‍රොජෙක්ට් එකේදි මේ path එක ඔයාගේ පරිගණකයේ තියෙන තැනට දෙන්න)
        print("AI Model Load වෙමින් පවතී...")
        self.model = SentenceTransformer('./singlish-sbert-model')
        
        # 2. දැනට Test කරන්න Ads ටිකක් මතකයේ තියාගැනීම 
        # (Production එකේදි මේක FAISS Database එකකින් එන්න ඕනේ)
        self.mock_ads = [
            {"id": "1", "text": "Samsung 55 inch Smart TV eka ikmanin wikinimata"},
            {"id": "2", "text": "Samsung ස්මාර්ට් ටීවී 55 අඩුවට"},
            {"id": "3", "text": "Alto 2018 car for sale urgently"},
            {"id": "4", "text": "Alto කාර් එක 2018 අඩුවට දෙනවා"},
            {"id": "5", "text": "කොළඹ 6 ඇනෙක්ස් එකක් කුලියට"}
        ]
        
        # Ads වල අර්ථයන් ගණනය කරලා තියාගන්නවා (Pre-compute embeddings)
        ad_texts = [ad["text"] for ad in self.mock_ads]
        self.corpus_embeddings = self.model.encode(ad_texts, convert_to_tensor=True)
        print("AI Engine සූදානම්!")

    def search(self, query: str, top_k: int = 5):
        # සෙවුම් වචනයේ අර්ථය ගණනය කිරීම
        query_embedding = self.model.encode(query, convert_to_tensor=True)
        
        # සමාන Ads සෙවීම
        search_results = util.semantic_search(query_embedding, self.corpus_embeddings, top_k=top_k)
        
        results = []
        for result in search_results[0]:
            ad = self.mock_ads[result['corpus_id']]
            score = round(result['score'] * 100, 2)
            results.append({
                "id": ad["id"],
                "text": ad["text"],
                "similarity_score": score
            })
            
        return results

# Singleton instance එකක් හදනවා හැමතැනම පාවිච්චි කරන්න
ai_engine = AIEngine()