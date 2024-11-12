// 'use client';

// import { useState } from 'react';

// export default function PdfCombinerSplitter() {
//   const [combineFiles, setCombineFiles] = useState<File[]>([]);
//   const [splitFile, setSplitFile] = useState<File | null>(null);
//   const [splitPageRanges, setSplitPageRanges] = useState('');
  
//   // Separate loading states for combine and split
//   const [combineLoading, setCombineLoading] = useState(false);
//   const [splitLoading, setSplitLoading] = useState(false);
  
//   // Separate download links for combine and split
//   const [combineDownloadLink, setCombineDownloadLink] = useState<string | null>(null);
//   const [splitDownloadLink, setSplitDownloadLink] = useState<string | null>(null);

//   // Handle file change for combine
//   const handleCombineFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setCombineFiles(Array.from(e.target.files));
//     }
//   };

//   // Handle file change for split
//   const handleSplitFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSplitFile(e.target.files[0]);
//     }
//   };

//   // Handle page range change for split
//   const handleSplitPageRangesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSplitPageRanges(e.target.value);
//   };

//   // Handle combine PDF submit
//   const handleCombineSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setCombineLoading(true);
//     setCombineDownloadLink(null); // Reset previous download link

//     const formData = new FormData();
//     combineFiles.forEach((file) => formData.append('files', file));

//     try {
//       const response = await fetch('/api/pdf/combine', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to combine PDFs');
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setCombineDownloadLink(url); // Set the download link for combined PDF
//     } catch (error) {
//       console.error('Error combining PDFs:', error);
//     } finally {
//       setCombineLoading(false);
//     }
//   };

//   // Handle split PDF submit
//   const handleSplitSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSplitLoading(true);
//     setSplitDownloadLink(null); // Reset previous download link

//     const formData = new FormData();
//     if (splitFile) formData.append('file', splitFile);
//     formData.append('pageRanges', splitPageRanges);

//     try {
//       const response = await fetch('/api/pdf/split', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to split PDF');
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setSplitDownloadLink(url); // Set the download link for split PDF
//     } catch (error) {
//       console.error('Error splitting PDF:', error);
//     } finally {
//       setSplitLoading(false);
//     }
//   };

//   return (
//     <div className="pdf-tool-container">
//       <h1>PDF Combiner and Splitter</h1>

//       <section>
//         <h2>Combine PDFs</h2>
//         <form onSubmit={handleCombineSubmit}>
//           <input
//             type="file"
//             accept="application/pdf"
//             multiple
//             onChange={handleCombineFileChange}
//             required
//           />
//           <button type="submit" disabled={combineLoading}>
//             {combineLoading ? 'Combining PDFs...' : 'Combine PDFs'}
//           </button>
//         </form>

//         {combineDownloadLink && (
//           <a href={combineDownloadLink} download="combined.pdf">
//             <button>Download Combined PDF</button>
//           </a>
//         )}
//       </section>

//       <section>
//         <h2>Split PDF</h2>
//         <form onSubmit={handleSplitSubmit}>
//           <input
//             type="file"
//             accept="application/pdf"
//             onChange={handleSplitFileChange}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Page ranges (e.g. 1-3,5,7-9)"
//             value={splitPageRanges}
//             onChange={handleSplitPageRangesChange}
//           />
//           <button type="submit" disabled={splitLoading}>
//             {splitLoading ? 'Splitting PDF...' : 'Split PDF'}
//           </button>
//         </form>

//         {splitDownloadLink && (
//           <a href={splitDownloadLink} download="split.pdf">
//             <button>Download Split PDF</button>
//           </a>
//         )}
//       </section>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';

export default function PdfCombinerSplitter() {
  const [combineFiles, setCombineFiles] = useState<File[]>([]);
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splitPageRanges, setSplitPageRanges] = useState('');
  
  // Separate loading states for combine and split
  const [combineLoading, setCombineLoading] = useState(false);
  const [splitLoading, setSplitLoading] = useState(false);
  
  // Separate download links for combine and split
  const [combineDownloadLink, setCombineDownloadLink] = useState<string | null>(null);
  const [splitDownloadLink, setSplitDownloadLink] = useState<string | null>(null);

  // Error messages for validation
  const [combineError, setCombineError] = useState<string | null>(null);
  const [splitError, setSplitError] = useState<string | null>(null);

  // Handle file change for combine
  const handleCombineFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCombineFiles(Array.from(e.target.files));
      setCombineError(null); // Reset error message on file change
    }
  };

  // Handle file change for split
  const handleSplitFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSplitFile(e.target.files[0]);
      setSplitError(null); // Reset error message on file change
    }
  };

  // Handle page range change for split
  const handleSplitPageRangesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSplitPageRanges(e.target.value);
    setSplitError(null); // Reset error message on input change
  };

  // Validate page range format for split PDFs
  const validatePageRanges = (ranges: string) => {
    const rangePattern = /^(\d+(-\d+)?(,\d+(-\d+)?)*)$/;
    return rangePattern.test(ranges.trim());
  };

  // Handle combine PDF submit
  const handleCombineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCombineLoading(true);
    setCombineDownloadLink(null); // Reset previous download link
    setCombineError(null); // Reset error message

    // Validation: Ensure at least one file is selected
    if (combineFiles.length === 0) {
      setCombineError('Please upload at least one PDF file to combine.');
      setCombineLoading(false);
      return;
    }

    const formData = new FormData();
    combineFiles.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('/api/pdf/combine', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to combine PDFs');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setCombineDownloadLink(url); // Set the download link for combined PDF
    } catch (error) {
      console.error('Error combining PDFs:', error);
      setCombineError('There was an error combining the PDFs.');
    } finally {
      setCombineLoading(false);
    }
  };

  // Handle split PDF submit
  const handleSplitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSplitLoading(true);
    setSplitDownloadLink(null); // Reset previous download link
    setSplitError(null); // Reset error message

    // Validation: Ensure a file is selected
    if (!splitFile) {
      setSplitError('Please upload a PDF file to split.');
      setSplitLoading(false);
      return;
    }

    // Validation: Ensure valid page range format
    if (!validatePageRanges(splitPageRanges)) {
      setSplitError('Invalid page range format. Use formats like "1-3", "5", or "1-3,5,7-9".');
      setSplitLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', splitFile);
    formData.append('pageRanges', splitPageRanges);

    try {
      const response = await fetch('/api/pdf/split', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to split PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setSplitDownloadLink(url); // Set the download link for split PDF
    } catch (error) {
      console.error('Error splitting PDF:', error);
      setSplitError('There was an error splitting the PDF.');
    } finally {
      setSplitLoading(false);
    }
  };

  return (
    <div className="pdf-tool-container">
      <h1>PDF Combiner and Splitter</h1>

      <section>
        <h2>Combine PDFs</h2>
        <form onSubmit={handleCombineSubmit}>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleCombineFileChange}
            required
          />
          <button type="submit" disabled={combineLoading}>
            {combineLoading ? 'Combining PDFs...' : 'Combine PDFs'}
          </button>
        </form>

        {combineError && <p className="error">{combineError}</p>}
        
        {combineDownloadLink && (
          <a href={combineDownloadLink} download="combined.pdf">
            <button>Download Combined PDF</button>
          </a>
        )}
      </section>

      <section>
        <h2>Split PDF</h2>
        <form onSubmit={handleSplitSubmit}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleSplitFileChange}
            required
          />
          <input
            type="text"
            placeholder="Page ranges (e.g. 1-3,5,7-9)"
            value={splitPageRanges}
            onChange={handleSplitPageRangesChange}
          />
          <button type="submit" disabled={splitLoading}>
            {splitLoading ? 'Splitting PDF...' : 'Split PDF'}
          </button>
        </form>

        {splitError && <p className="error">{splitError}</p>}

        {splitDownloadLink && (
          <a href={splitDownloadLink} download="split.pdf">
            <button>Download Split PDF</button>
          </a>
        )}
      </section>
    </div>
  );
}
