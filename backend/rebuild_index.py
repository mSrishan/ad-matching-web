"""
Rebuild the FAISS index using the current singlish-sbert-model.
Encodes all normalized_text entries from corpus_metadata.csv,
L2-normalizes the embeddings, and saves as IndexFlatIP.
"""
import os
import sys
import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BACKEND_DIR, "singlish-sbert-model")
CSV_PATH = os.path.join(BACKEND_DIR, "resources", "corpus_metadata.csv")
INDEX_PATH = os.path.join(BACKEND_DIR, "resources", "ad_faiss_index.bin")
BATCH_SIZE = 256

def main():
    print("Loading model from:", MODEL_PATH)
    model = SentenceTransformer(MODEL_PATH)

    print("Loading corpus from:", CSV_PATH)
    df = pd.read_csv(CSV_PATH)
    print(f"Corpus size: {len(df)} rows")
    print(f"Columns: {list(df.columns)}")

    # Use normalized_text for encoding (same as training)
    texts = df["normalized_text"].fillna("").tolist()
    print(f"Encoding {len(texts)} texts with batch_size={BATCH_SIZE}...")

    embeddings = model.encode(
        texts,
        batch_size=BATCH_SIZE,
        show_progress_bar=True,
        normalize_embeddings=True,  # L2-normalize for cosine similarity via IP
    ).astype("float32")

    print(f"Embeddings shape: {embeddings.shape}")
    print(f"Sample norms: {[round(float(np.linalg.norm(embeddings[i])), 4) for i in range(min(5, len(embeddings)))]}")

    # Build FAISS IndexFlatIP (inner product = cosine similarity when normalized)
    dim = embeddings.shape[1]
    index = faiss.IndexFlatIP(dim)
    index.add(embeddings)
    print(f"FAISS index built: {index.ntotal} vectors, dim={index.d}")

    # Verify: encode row 0's text and search — should return itself
    test_emb = model.encode([texts[0]], normalize_embeddings=True).astype("float32")
    scores, indices = index.search(test_emb, 1)
    print(f"Verification: query=row[0], result_idx={indices[0][0]}, score={scores[0][0]:.4f}")
    if indices[0][0] == 0 and scores[0][0] > 0.99:
        print("✓ Verification PASSED — index is correctly aligned with model")
    else:
        print("✗ Verification FAILED — something is wrong")
        sys.exit(1)

    # Save
    faiss.write_index(index, INDEX_PATH)
    print(f"Saved index to: {INDEX_PATH}")
    print("Done!")

if __name__ == "__main__":
    main()
