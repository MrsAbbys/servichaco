from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.vectorstore.retriever import search_similar_chunks

app = FastAPI(
    title="ServiChaco RAG Engine",
    description="Motor de recuperación aumentada por búsqueda y análisis de documentos de Yacuiba",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str
    top_k: int = 3

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "rag-engine"}

@app.post("/api/v1/rag/retrieve")
def retrieve_context(req: QueryRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="La consulta no puede estar vacía")
    
    results = search_similar_chunks(req.query, top_k=req.top_k)
    return {
        "query": req.query,
        "total_results": len(results),
        "results": results
    }
