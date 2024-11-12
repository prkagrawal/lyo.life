// "use client";

// import React, { useState } from "react";
// import Cropper, { ReactCropperElement } from "react-cropper";
// import "cropperjs/dist/cropper.css";

// const ImageCropper = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [croppedImage, setCroppedImage] = useState<string | null>(null);
//   const cropperRef = React.useRef<ReactCropperElement>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const cropImage = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       setCroppedImage(cropper.getCroppedCanvas().toDataURL());
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-6">
//       <h2 className="text-2xl font-bold">Image Cropper</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {image && (
//         <Cropper
//           src={image}
//           style={{ height: 400, width: "100%" }}
//           initialAspectRatio={1}
//           guides={true}
//           ref={cropperRef}
//         />
//       )}
//       <button
//         onClick={cropImage}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//       >
//         Crop Image
//       </button>
//       {croppedImage && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Cropped Image:</h3>
//           <img src={croppedImage} alt="Cropped" className="mt-2" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageCropper;

// "use client";

// import React, { useState } from "react";
// import Cropper, { ReactCropperElement } from "react-cropper";
// import "cropperjs/dist/cropper.css";

// const ImageCropper = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [croppedImage, setCroppedImage] = useState<string | null>(null);
//   const [scaleX, setScaleX] = useState(1);
//   const [scaleY, setScaleY] = useState(1);
//   const [rotateAngle, setRotateAngle] = useState(0);
//   const cropperRef = React.useRef<ReactCropperElement>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const cropImage = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       setCroppedImage(cropper.getCroppedCanvas().toDataURL());
//     }
//   };

//   const rotateImage = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       setRotateAngle((prev) => prev + 45); // Rotate by 45 degrees
//       cropper.rotate(45);
//     }
//   };

//   const resetRotation = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       cropper.rotateTo(0);
//       setRotateAngle(0);
//     }
//   };

//   const flipImageHorizontally = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       setScaleX((prevScale) => -prevScale);
//       cropper.scaleX(scaleX === 1 ? -1 : 1);
//     }
//   };

//   const flipImageVertically = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       setScaleY((prevScale) => -prevScale);
//       cropper.scaleY(scaleY === 1 ? -1 : 1);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-6">
//       <h2 className="text-2xl font-bold">Image Cropper</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
      
//       {image && (
//         <Cropper
//           src={image}
//           style={{ height: 400, width: "100%" }}
//           initialAspectRatio={1}
//           guides={true}
//           ref={cropperRef}
//           viewMode={1}  // Restricts the crop box to stay within the canvas
//           movable={true}  // Allows moving the image within the crop box
//           rotatable={true}  // Allows rotation
//           scalable={true}  // Allows scaling (flipping)
//           zoomable={true}  // Allows zooming
//           background={false}  // Hides the default grid background
//           autoCropArea={1}  // Ensures the image fills the canvas as much as possible
//           checkOrientation={true}  // Checks the image's exif orientation
//         />
//       )}

//       <div className="flex gap-2 mt-4">
//         <button
//           onClick={rotateImage}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Rotate 45°
//         </button>
//         <button
//           onClick={resetRotation}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Reset Rotation
//         </button>
//         <button
//           onClick={flipImageHorizontally}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Flip Horizontally
//         </button>
//         <button
//           onClick={flipImageVertically}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Flip Vertically
//         </button>
//         <button
//           onClick={cropImage}
//           className="px-4 py-2 bg-green-600 text-white rounded-md"
//         >
//           Crop Image
//         </button>
//       </div>

//       {croppedImage && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Cropped Image:</h3>
//           <img src={croppedImage} alt="Cropped" className="mt-2" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageCropper;
// add download button, can we also support multiple crops functionality for some use cases like their are four icons/images and user want to separate them, so they can crop  each one by one then download them together, instead of just cropping one then saving then same again

// "use client";

// import React, { useState } from "react";
// import Cropper, { ReactCropperElement } from "react-cropper";
// import "cropperjs/dist/cropper.css";

// const ImageCropper = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [croppedImages, setCroppedImages] = useState<string[]>([]); // Stores multiple cropped images
//   const [scaleX, setScaleX] = useState(1);
//   const [scaleY, setScaleY] = useState(1);
//   const [rotateAngle, setRotateAngle] = useState(0);
//   const cropperRef = React.useRef<ReactCropperElement>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const cropImage = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       const croppedCanvas = cropper.getCroppedCanvas();
//       const croppedImage = croppedCanvas.toDataURL();
//       setCroppedImages((prev) => [...prev, croppedImage]); // Add new cropped image to the list
//     }
//   };

//   const rotateImage = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       setRotateAngle((prev) => prev + 45); // Rotate by 45 degrees
//       cropper.rotate(45);
//     }
//   };

//   const resetRotation = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       cropper.rotateTo(0);
//       setRotateAngle(0);
//     }
//   };

//   const flipImageHorizontally = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       setScaleX((prevScale) => -prevScale);
//       cropper.scaleX(scaleX === 1 ? -1 : 1);
//     }
//   };

//   const flipImageVertically = () => {
//     const cropper = cropperRef.current?.cropper;
//     if (cropper) {
//       setScaleY((prevScale) => -prevScale);
//       cropper.scaleY(scaleY === 1 ? -1 : 1);
//     }
//   };

//   const downloadCroppedImages = () => {
//     croppedImages.forEach((image, index) => {
//       const link = document.createElement("a");
//       link.href = image;
//       link.download = `cropped-image-${index + 1}.png`;
//       link.click();
//     });
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-6">
//       <h2 className="text-2xl font-bold">Image Cropper</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
      
//       {image && (
//         <Cropper
//           src={image}
//           style={{ height: 400, width: "100%" }}
//           initialAspectRatio={1}
//           guides={true}
//           ref={cropperRef}
//           viewMode={1}  // Restricts the crop box to stay within the canvas
//           movable={true}  // Allows moving the image within the crop box
//           rotatable={true}  // Allows rotation
//           scalable={true}  // Allows scaling (flipping)
//           zoomable={true}  // Allows zooming
//           background={false}  // Hides the default grid background
//           autoCropArea={1}  // Ensures the image fills the canvas as much as possible
//           checkOrientation={true}  // Checks the image's exif orientation
//         />
//       )}

//       <div className="flex gap-2 mt-4">
//         <button
//           onClick={rotateImage}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Rotate 45°
//         </button>
//         <button
//           onClick={resetRotation}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Reset Rotation
//         </button>
//         <button
//           onClick={flipImageHorizontally}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Flip Horizontally
//         </button>
//         <button
//           onClick={flipImageVertically}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Flip Vertically
//         </button>
//         <button
//           onClick={cropImage}
//           className="px-4 py-2 bg-green-600 text-white rounded-md"
//         >
//           Crop Image
//         </button>
//         <button
//           onClick={downloadCroppedImages}
//           className="px-4 py-2 bg-gray-600 text-white rounded-md"
//         >
//           Download All Crops
//         </button>
//       </div>

//       {croppedImages.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Cropped Images:</h3>
//           <div className="grid grid-cols-2 gap-4">
//             {croppedImages.map((image, index) => (
//               <div key={index}>
//                 <img src={image} alt={`Cropped ${index + 1}`} className="mt-2" />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageCropper;


"use client";

import React, { useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import JSZip from "jszip";
import "cropperjs/dist/cropper.css";

const ImageCropper = () => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImages, setCroppedImages] = useState<{ img: string; index: number }[]>([]);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [rotateAngle, setRotateAngle] = useState(0);
  const cropperRef = React.useRef<ReactCropperElement>(null);
  const [fileExtension, setFileExtension] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setFileExtension(file.name.split(".").pop() || "png"); // Get the file extension of the original image
      };
      reader.readAsDataURL(file);
    }
  };

  const cropImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL();
      setCroppedImages((prev) => [
        ...prev,
        { img: croppedImage, index: prev.length + 1 },
      ]);
    }
  };

  const rotateImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setRotateAngle((prev) => prev + 45); // Rotate by 45 degrees
      cropper.rotate(45);
    }
  };

  const resetRotation = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.rotateTo(0);
      setRotateAngle(0);
    }
  };

  const flipImageHorizontally = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setScaleX((prevScale) => -prevScale);
      cropper.scaleX(scaleX === 1 ? -1 : 1);
    }
  };

  const flipImageVertically = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      setScaleY((prevScale) => -prevScale);
      cropper.scaleY(scaleY === 1 ? -1 : 1);
    }
  };

  const downloadCroppedImages = () => {
    if (croppedImages.length === 1) {
      // If only one cropped image, download it normally
      const link = document.createElement("a");
      link.href = croppedImages[0].img;
      link.download = `cropped-image.${fileExtension}`;
      link.click();
    } else {
      // If multiple crops, create a ZIP file
      const zip = new JSZip();
      croppedImages.forEach((crop, index) => {
        // Convert base64 to binary data
        fetch(crop.img)
          .then((res) => res.blob())
          .then((blob) => {
            zip.file(`cropped-image-${index + 1}.${fileExtension}`, blob);
            // Once all images are added to the ZIP, generate and download it
            if (index === croppedImages.length - 1) {
              zip.generateAsync({ type: "blob" }).then((content) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(content);
                link.download = "cropped-images.zip";
                link.click();
              });
            }
          });
      });
    }
  };

  const deleteCrop = (index: number) => {
    setCroppedImages((prev) => prev.filter((crop) => crop.index !== index));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold">Image Cropper</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      {image && (
        <Cropper
          src={image}
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          guides={true}
          ref={cropperRef}
          viewMode={1}  // Restricts the crop box to stay within the canvas
          movable={true}  // Allows moving the image within the crop box
          rotatable={true}  // Allows rotation
          scalable={true}  // Allows scaling (flipping)
          zoomable={true}  // Allows zooming
          background={false}  // Hides the default grid background
          autoCropArea={1}  // Ensures the image fills the canvas as much as possible
          checkOrientation={true}  // Checks the image's exif orientation
        />
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={rotateImage}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Rotate 45°
        </button>
        <button
          onClick={resetRotation}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Reset Rotation
        </button>
        <button
          onClick={flipImageHorizontally}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Flip Horizontally
        </button>
        <button
          onClick={flipImageVertically}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Flip Vertically
        </button>
        <button
          onClick={cropImage}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Crop Image
        </button>
        <button
          onClick={downloadCroppedImages}
          className="px-4 py-2 bg-gray-600 text-white rounded-md"
        >
          Download All Crops
        </button>
      </div>

      {croppedImages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Cropped Images:</h3>
          <div className="grid grid-cols-2 gap-4">
            {croppedImages.map((crop) => (
              <div key={crop.index} className="relative">
                <img src={crop.img} alt={`Cropped ${crop.index}`} className="mt-2" />
                <button
                  onClick={() => deleteCrop(crop.index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;

