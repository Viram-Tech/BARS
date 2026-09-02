from pathlib import Path
from pypdf import PdfReader

src = Path(r"c:\Users\LENOVO\Desktop\Yash Stuffs\RESUME2025\Top Projects\BARS-Road-Safety-Platformzip\BARS\Sources")
out = Path(r"c:\Users\LENOVO\Desktop\Yash Stuffs\RESUME2025\Top Projects\BARS-Road-Safety-Platformzip\BARS\scripts\pdf-extracts")
out.mkdir(parents=True, exist_ok=True)

for i, pdf in enumerate(sorted(src.glob("*.pdf")), 1):
    reader = PdfReader(str(pdf))
    chunks = [f"# {pdf.name}\npages={len(reader.pages)}\n"]
    for n, page in enumerate(reader.pages):
        chunks.append(f"\n--- page {n+1} ---\n")
        chunks.append(page.extract_text() or "")
    dest = out / f"{i}-{pdf.stem[:50]}.txt"
    dest.write_text("".join(chunks), encoding="utf-8", errors="replace")
    print("wrote", dest.name, "pages", len(reader.pages), "chars", dest.stat().st_size)
