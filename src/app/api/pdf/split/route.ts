import { NextResponse } from 'next/server';
import { PDFDocument, PDFPage } from 'pdf-lib';

export async function POST(request: Request) {
  try {
    // Get the form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    const pageRanges = formData.get('pageRanges') ? formData.get('pageRanges') as string : '';

    // Ensure a file is uploaded
    if (!file) {
      return NextResponse.json({ error: 'No PDF file uploaded' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const pdfDoc = await PDFDocument.load(fileBuffer);

    const splitPdfs: Buffer[] = [];
    const pages = pdfDoc.getPages();

    if (pageRanges) {
      // Split PDF based on the page ranges provided by the user
      const ranges = pageRanges.split(',');
      for (const range of ranges) {
        const [start, end] = range.split('-').map((num) => parseInt(num.trim(), 10));
        const splitPdf = await PDFDocument.create();
        const copiedPages = await splitPdf.copyPages(pdfDoc, Array.from({ length: end - start + 1 }, (_, i) => start + i - 1));
        copiedPages.forEach((page: PDFPage) => splitPdf.addPage(page));

        const splitPdfBytes = await splitPdf.save();
        splitPdfs.push(Buffer.from(splitPdfBytes));
      }
    } else {
      // If no page range is provided, split the PDF into single-page PDFs
      pages.forEach(async (_, index) => {
        const splitPdf = await PDFDocument.create();
        const copiedPage = await splitPdf.copyPages(pdfDoc, [index]);
        splitPdf.addPage(copiedPage[0]);

        const splitPdfBytes = await splitPdf.save();
        splitPdfs.push(Buffer.from(splitPdfBytes));
      });
    }

    // Return the split PDFs as a zip or individual files
    if (splitPdfs.length > 1) {
      // For multiple PDFs, return them in a zip (optional, needs a library like 'jszip')
      return new NextResponse(JSON.stringify({ message: 'Multiple PDFs created successfully' }), { status: 200 });
    } else {
      return new NextResponse(splitPdfs[0], {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="split.pdf"`,
        },
      });
    }
  } catch (error) {
    console.error('Error splitting PDF:', error);
    return NextResponse.json({ error: 'Failed to split PDF' }, { status: 500 });
  }
}
