#!/bin/bash
# Generate PDF and DOCX from CV markdown

CV_SOURCE="src/content/cv.md"
OUTPUT_DIR="public"

echo "Generating CV files..."

# Generate DOCX
pandoc "$CV_SOURCE" \
  -o "$OUTPUT_DIR/Dwain_Maralack_CV.docx" \
  --from markdown \
  --to docx \
  --metadata title="Dwain Maralack - CV"

echo "✓ Generated Dwain_Maralack_CV.docx"

# Generate PDF via pandoc (if you have a LaTeX engine)
# Or use the existing PDF
if command -v pdflatex &> /dev/null || command -v xelatex &> /dev/null; then
  pandoc "$CV_SOURCE" \
    -o "$OUTPUT_DIR/Dwain_Maralack_CV.pdf" \
    --from markdown \
    --pdf-engine=xelatex \
    -V geometry:margin=1in \
    -V mainfont="Helvetica" \
    --metadata title="Dwain Maralack - CV"
  echo "✓ Generated Dwain_Maralack_CV.pdf"
else
  # Fallback: use existing PDF if already in public (committed to repo)
  if [ -f "$OUTPUT_DIR/Dwain_Maralack_CV.pdf" ]; then
    echo "✓ Using existing PDF from repo"
  elif [ -f ~/Downloads/Dwain_Maralack_CV_Final.pdf ]; then
    cp ~/Downloads/Dwain_Maralack_CV_Final.pdf "$OUTPUT_DIR/Dwain_Maralack_CV.pdf"
    echo "✓ Copied existing PDF"
  else
    echo "⚠ No LaTeX engine found and no existing PDF. PDF not generated."
  fi
fi

echo "Done!"
