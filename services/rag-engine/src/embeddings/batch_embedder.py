import time
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

def process_and_store_batches(chunks_data: list[dict], batch_size: int = 16) -> dict:
    """
    Recibe una lista de dicts con: { source_file, extraction_method, page, chunk_text }
    Procesa los embeddings en batches de tamaño configurable y mide el tiempo de cómputo.
    """
    total_chunks = len(chunks_data)
    texts = [item["chunk_text"] for item in chunks_data]

    start_time = time.perf_counter()

    # Generación vectorial en batches
    embeddings = model.encode(texts, batch_size=batch_size, show_progress_bar=False)

    encoding_time = time.perf_counter() - start_time

    # Almacenamiento en base de datos
    conn = get_db_connection()
    cur = conn.cursor()

    insert_query = """
        INSERT INTO rag_document_chunks (source_file, extraction_method, page_number, chunk_text, embedding)
        VALUES (%s, %s, %s, %s, %s)
    """

    for item, emb in zip(chunks_data, embeddings):
        cur.execute(insert_query, (
            item["source_file"],
            item["extraction_method"],
            item["page"],
            item["chunk_text"],
            emb.tolist()
        ))

    conn.commit()
    cur.close()
    conn.close()

    return {
        "total_chunks": total_chunks,
        "batch_size": batch_size,
        "encoding_time_seconds": round(encoding_time, 4),
        "throughput_chunks_per_sec": round(total_chunks / encoding_time, 2) if encoding_time > 0 else 0
    }
