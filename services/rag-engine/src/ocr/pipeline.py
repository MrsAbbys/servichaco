import os
from pypdf import PdfReader
import pytesseract
from PIL import Image

def extract_text_native(pdf_path: str) -> list[dict]:
    """Extrae texto directo de PDFs no escaneados."""
    reader = PdfReader(pdf_path)
    pages_content = []
    for idx, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        pages_content.append({
            "page": idx + 1,
            "text": text.strip(),
            "method": "native_pdf"
        })
    return pages_content

def extract_text_ocr(image_path: str) -> list[dict]:
    """Extrae texto mediante OCR de imágenes escaneadas."""
    img = Image.open(image_path)
    # Convertir a escala de grises para reducir ruido en binarización
    img_gray = img.convert('L')
    text = pytesseract.image_to_string(img_gray, lang='spa')
    return [{
        "page": 1,
        "text": text.strip(),
        "method": "ocr_tesseract"
    }]

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """Divide texto en fragmentos solapados respetando palabras."""
    words = text.split()
    chunks = []
    step = chunk_size - overlap
    if step <= 0:
        step = chunk_size

    for i in range(0, len(words), step):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    return chunks
