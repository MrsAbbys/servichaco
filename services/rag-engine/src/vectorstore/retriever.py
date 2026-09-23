import psycopg2
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_db_connection():
    return psycopg2.connect(
        dbname='servichaco_db',
        user='servichaco_admin',
        password='servichaco_secret_2026',
        host='127.0.0.1',
        port='5432'
    )

def search_similar_chunks(query: str, top_k: int = 3) -> list[dict]:
    # 1. Vectorizar la consulta del usuario
    query_vector = model.encode(query).tolist()

    # 2. Consultar similitud de cosenos en PostgreSQL con pgvector
    conn = get_db_connection()
    cur = conn.cursor()

    sql = """
        SELECT 
            id,
            source_file,
            extraction_method,
            page_number,
            chunk_text,
            1 - (embedding <=> %s::vector) AS similarity_score
        FROM rag_document_chunks
        ORDER BY embedding <=> %s::vector ASC
        LIMIT %s;
    """

    cur.execute(sql, (query_vector, query_vector, top_k))
    rows = cur.fetchall()

    cur.close()
    conn.close()

    results = []
    for r in rows:
        results.append({
            "id": str(r[0]),
            "source_file": r[1],
            "extraction_method": r[2],
            "page": r[3],
            "text": r[4],
            "score": round(float(r[5]), 4)
        })

    return results
