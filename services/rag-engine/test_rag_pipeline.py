from src.ocr.pipeline import chunk_text
from src.embeddings.batch_embedder import process_and_store_batches

# Texto simulado de ordenanza municipal de transporte en Yacuiba
sample_text = (
    "ORDENANZA MUNICIPAL GOBIERNO AUTÓNOMO REGIONAL DEL GRAN CHACO - YACUIBA. "
    "Artículo 1: Se establece la regulación formal del servicio de transporte público de pasajeros "
    "en las modalidades de microbuses y trufis que cubren la ruta desde el Mercado Campesino "
    "hasta el Paso Fronterizo de San José de Pocitos. "
    "Artículo 2: Las tarifas vigentes se fijan en 2.00 Bolivianos para el tramo urbano general y "
    "1.00 Boliviano para estudiantes debidamente identificados. "
    "Artículo 3: El horario de circulación obligatorio comprende desde las 05:30 horas hasta las 22:00 horas, "
    "con intervalos de frecuencia no mayores a diez minutos durante horas pico en días de feria comercial. "
    "Artículo 4: Queda prohibida la alteración de rutas sin previa autorización de la Dirección de Tráfico y Vialidad."
)

chunks = chunk_text(sample_text, chunk_size=30, overlap=5)
print(f"📄 Fragmentos generados: {len(chunks)}")

chunks_data = [
    {
        "source_file": "ordenanza_transporte_yacuiba_2026.pdf",
        "extraction_method": "native_pdf",
        "page": 1,
        "chunk_text": ch
    }
    for ch in chunks
]

# Prueba con lote de tamaño 4
results = process_and_store_batches(chunks_data, batch_size=4)
print(" Experimento de indexación completado:")
print(results)
