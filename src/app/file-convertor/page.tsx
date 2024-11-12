// 'use client';

// import { useState } from 'react';

// export default function ImageConverterPage() {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [width, setWidth] = useState<number | string>('');
//   const [height, setHeight] = useState<number | string>('');
//   const [resizedImage, setResizedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   // Handle image file input change
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   // Handle width and height input change
//   const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === 'width') {
//       setWidth(value);
//     } else if (name === 'height') {
//       setHeight(value);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!imageFile) return;

//     setLoading(true);

//     const formData = new FormData();
//     formData.append('file', imageFile);
//     formData.append('width', width ? String(width) : '');
//     formData.append('height', height ? String(height) : '');

//     try {
//       const response = await fetch('/api/image', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to resize image');
//       }

//       const imageBlob = await response.blob();
//       const imageUrl = URL.createObjectURL(imageBlob);
//       setResizedImage(imageUrl);
//     } catch (error) {
//       console.error('Error uploading and resizing image:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="image-converter-container">
//       <h1>Image Resizer and Converter</h1>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="file">Upload Image</label>
//           <input
//             type="file"
//             id="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="width">Width</label>
//           <input
//             type="number"
//             id="width"
//             name="width"
//             value={width}
//             onChange={handleDimensionChange}
//             placeholder="Enter width"
//           />
//         </div>

//         <div>
//           <label htmlFor="height">Height</label>
//           <input
//             type="number"
//             id="height"
//             name="height"
//             value={height}
//             onChange={handleDimensionChange}
//             placeholder="Enter height"
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Resizing...' : 'Resize Image'}
//         </button>
//       </form>

//       {resizedImage && (
//         <div>
//           <h2>Resized Image:</h2>
//           <img src={resizedImage} alt="Resized" />
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';

// export default function ImageConverterPage() {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [width, setWidth] = useState<number | string>('');
//   const [height, setHeight] = useState<number | string>('');
//   const [format, setFormat] = useState('jpeg'); // Default format to JPEG
//   const [resizedImage, setResizedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   // Handle image file input change
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   // Handle width and height input change
//   const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === 'width') {
//       setWidth(value);
//     } else if (name === 'height') {
//       setHeight(value);
//     }
//   };

//   // Handle format change
//   const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormat(e.target.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!imageFile) return;

//     setLoading(true);

//     const formData = new FormData();
//     formData.append('file', imageFile);
//     formData.append('width', width ? String(width) : '');
//     formData.append('height', height ? String(height) : '');
//     formData.append('format', format);

//     try {
//       const response = await fetch('/api/image', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to resize and convert image');
//       }

//       const imageBlob = await response.blob();
//       const imageUrl = URL.createObjectURL(imageBlob);
//       setResizedImage(imageUrl);
//     } catch (error) {
//       console.error('Error uploading and processing image:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="image-converter-container">
//       <h1>Image Resizer and Converter</h1>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="file">Upload Image</label>
//           <input
//             type="file"
//             id="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="width">Width</label>
//           <input
//             type="number"
//             id="width"
//             name="width"
//             value={width}
//             onChange={handleDimensionChange}
//             placeholder="Enter width"
//           />
//         </div>

//         <div>
//           <label htmlFor="height">Height</label>
//           <input
//             type="number"
//             id="height"
//             name="height"
//             value={height}
//             onChange={handleDimensionChange}
//             placeholder="Enter height"
//           />
//         </div>

//         <div>
//           <label htmlFor="format">Format</label>
//           <select id="format" value={format} onChange={handleFormatChange}>
//             <option value="jpeg">JPEG</option>
//             <option value="png">PNG</option>
//             <option value="webp">WebP</option>
//             <option value="gif">GIF</option>
//             <option value="avif">AVIF</option>
//           </select>
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Processing...' : 'Convert and Resize Image'}
//         </button>
//       </form>

//       {resizedImage && (
//         <div>
//           <h2>Converted Image:</h2>
//           <img src={resizedImage} alt="Converted and resized" />
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState } from 'react';

export default function ImageConverterPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number | string>('');
  const [height, setHeight] = useState<number | string>('');
  const [format, setFormat] = useState('jpeg'); // Default format to JPEG
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null); // Store download link
  const [fileName, setFileName] = useState<string | null>(null); // Store the new file name

  // Handle image file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle width and height input change
  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'width') {
      setWidth(value);
    } else if (name === 'height') {
      setHeight(value);
    }
  };

  // Handle format change
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;

    setLoading(true);
    setDownloadLink(null); // Reset the download link on each submission

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('width', width ? String(width) : '');
    formData.append('height', height ? String(height) : '');
    formData.append('format', format);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to resize and convert image');
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setResizedImage(imageUrl);

      // Extract file name from the response headers and set it
      const newFileName = response.headers.get('Content-Disposition')?.split('=')[1]?.replace(/"/g, '') || 'resized-image';
      setFileName(newFileName);

      // Create the download link
      const downloadUrl = URL.createObjectURL(imageBlob);
      setDownloadLink(downloadUrl);
    } catch (error) {
      console.error('Error uploading and processing image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-converter-container">
      <h1>Image Resizer and Converter</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Upload Image</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label htmlFor="width">Width</label>
          <input
            type="number"
            id="width"
            name="width"
            value={width}
            onChange={handleDimensionChange}
            placeholder="Enter width"
          />
        </div>

        <div>
          <label htmlFor="height">Height</label>
          <input
            type="number"
            id="height"
            name="height"
            value={height}
            onChange={handleDimensionChange}
            placeholder="Enter height"
          />
        </div>

        <div>
          <label htmlFor="format">Format</label>
          <select id="format" value={format} onChange={handleFormatChange} className="dropdown">
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
            <option value="gif">GIF</option>
            <option value="avif">AVIF</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Convert and Resize Image'}
        </button>
      </form>

      {resizedImage && (
        <div>
          <h2>Converted Image:</h2>
          <img src={resizedImage} alt="Converted and resized" />
          <br />
          {fileName && (
            <a href={downloadLink || undefined} download={fileName}>
              <button>Download {fileName}</button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
