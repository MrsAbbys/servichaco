import time
import statistics
import concurrent.futures
from src.vectorstore.retriever import search_similar_chunks

TEST_QUERIES = [
    "Cual es el precio del pasaje para estudiantes en micro?",
    "Horarios de salida de los trufis hacia Pocitos",
    "Regulacion del transporte en ferias comerciales de Yacuiba",
    "Tarifas vigentes para el tramo urbano general",
    "Multas por alteracion de ruta segun la direccion de trafico"
]

def run_single_query(query: str):
    start = time.perf_counter()
    results = search_similar_chunks(query, top_k=2)
    elapsed_ms = (time.perf_counter() - start) * 1000.0
    return elapsed_ms, len(results)

def execute_benchmark(total_requests: int = 50, concurrency: int = 5):
    print(f"\n=======================================================")
    print(f"📊 EJECUTANDO BENCHMARK RAG ENGINE (pgvector + HNSW)")
    print(f"   Total de peticiones: {total_requests} | Concurrencia: {concurrency}")
    print(f"=======================================================")

    latencies = []
    start_total = time.perf_counter()

    with concurrent.futures.ThreadPoolExecutor(max_workers=concurrency) as executor:
        futures = [
            executor.submit(run_single_query, TEST_QUERIES[i % len(TEST_QUERIES)])
            for i in range(total_requests)
        ]
        for f in concurrent.futures.as_completed(futures):
            lat, count = f.result()
            latencies.append(lat)

    total_time = time.perf_counter() - start_total
    rps = total_requests / total_time

    latencies.sort()
    p50 = statistics.median(latencies)
    p95 = latencies[int(len(latencies) * 0.95)]
    p99 = latencies[int(len(latencies) * 0.99)]
    avg = statistics.mean(latencies)

    print("\n--- RESULTADOS DEL BENCHMARK ---")
    print(f" Tiempo total:         {total_time:.3f} s")
    print(f" Throughput:           {rps:.2f} req/s")
    print(f" Latencia Promedio:    {avg:.2f} ms")
    print(f" Latencia Mediana p50: {p50:.2f} ms")
    print(f" Latencia p95:         {p95:.2f} ms")
    print(f" Latencia p99:         {p99:.2f} ms")
    print(f" Min / Max:            {min(latencies):.2f} ms / {max(latencies):.2f} ms")
    print("--------------------------------\n")

if __name__ == '__main__':
    execute_benchmark(total_requests=40, concurrency=4)
