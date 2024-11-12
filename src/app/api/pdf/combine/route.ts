import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: Request) {
  try {
    // Get the form data
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    // Ensure files are uploaded
    if (files.length === 0) {
      return NextResponse.json({ error: 'No PDF files uploaded' }, { status: 400 });
    }

    // Create a new PDF document to combine all uploaded PDFs
    const combinedPdf = await PDFDocument.create();

    for (const file of files) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const pdfDoc = await PDFDocument.load(fileBuffer);

      // Copy all pages from the current PDF into the combined PDF
      const copiedPages = await combinedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach((page) => combinedPdf.addPage(page));
    }

    // Serialize the combined PDF to bytes
    const combinedPdfBytes = await combinedPdf.save();

    // Create a downloadable link with the combined PDF
    return new NextResponse(combinedPdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="combined.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error combining PDFs:', error);
    return NextResponse.json({ error: 'Failed to combine PDFs' }, { status: 500 });
  }
}
