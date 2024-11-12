// import sharp from 'sharp';
// import fs from 'fs';
// import path from 'path';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     // Get the form data
//     const formData = await request.formData();
//     const file = formData.get('file') as File;

//     // Ensure a file is provided
//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     // Read the file into a buffer
//     const buffer = Buffer.from(await file.arrayBuffer());

//     // Read the width and height from the form data
//     const width = formData.get('width') ? parseInt(formData.get('width') as string) : null;
//     const height = formData.get('height') ? parseInt(formData.get('height') as string) : null;

//     // Use sharp to resize the image
//     let image = sharp(buffer);

//     if (width || height) {
//       image = image.resize(width, height);
//     }

//     // Convert to the desired format (JPEG, PNG, etc.)
//     const outputBuffer = await image.toBuffer();

//     // Return the resized image as a response
//     return new NextResponse(outputBuffer, {
//       headers: {
//         'Content-Type': 'image/jpeg', // Adjust based on the format you choose (e.g., 'image/png')
//         'Content-Disposition': 'attachment; filename="resized-image.jpg"',
//       },
//     });
//   } catch (error) {
//     console.error('Error processing image:', error);
//     return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
//   }
// }

// import sharp from 'sharp';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     // Get the form data
//     const formData = await request.formData();
//     const file = formData.get('file') as File;

//     // Ensure a file is provided
//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     // Read the file into a buffer
//     const buffer = Buffer.from(await file.arrayBuffer());

//     // Read the width, height, and target format from the form data
//     const width = formData.get('width') ? parseInt(formData.get('width') as string) : null;
//     const height = formData.get('height') ? parseInt(formData.get('height') as string) : null;
//     const format = formData.get('format') ? (formData.get('format') as string).toLowerCase() : 'jpeg'; // Default to 'jpeg' if not provided

//     // Use sharp to process the image
//     let image = sharp(buffer);

//     // Resize the image if width/height is provided
//     if (width || height) {
//       image = image.resize(width, height);
//     }

//     // Convert to the specified format
//     let outputBuffer: Buffer;

//     switch (format) {
//       case 'png':
//         outputBuffer = await image.toFormat('png').toBuffer();
//         break;
//       case 'webp':
//         outputBuffer = await image.toFormat('webp').toBuffer();
//         break;
//       case 'gif':
//         outputBuffer = await image.toFormat('gif').toBuffer();
//         break;
//       case 'avif':
//         outputBuffer = await image.toFormat('avif').toBuffer();
//         break;
//       case 'jpeg':
//       default:
//         outputBuffer = await image.toFormat('jpeg').toBuffer();
//         break;
//     }

//     // Determine the correct Content-Type based on the format
//     const contentType = getContentType(format);

//     // Return the converted and resized image as a response
//     return new NextResponse(outputBuffer, {
//       headers: {
//         'Content-Type': contentType,
//         'Content-Disposition': `attachment; filename="resized-image.${format}"`,
//       },
//     });
//   } catch (error) {
//     console.error('Error processing image:', error);
//     return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
//   }
// }

// // Helper function to determine the content type for the image format
// function getContentType(format: string): string {
//   switch (format) {
//     case 'png':
//       return 'image/png';
//     case 'webp':
//       return 'image/webp';
//     case 'gif':
//       return 'image/gif';
//     case 'avif':
//       return 'image/avif';
//     case 'jpeg':
//     default:
//       return 'image/jpeg';
//   }
// }

import sharp from "sharp";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Ensure a file is provided
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read the file into a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Get original file name and extension
    const originalFileName = file.name;
    const originalExtension = path.extname(originalFileName).toLowerCase();

    // Read the width, height, and target format from the form data
    const width = formData.get("width")
      ? parseInt(formData.get("width") as string)
      : null;
    const height = formData.get("height")
      ? parseInt(formData.get("height") as string)
      : null;
    const format = formData.get("format")
      ? (formData.get("format") as string).toLowerCase()
      : "jpeg"; // Default to 'jpeg' if not provided

    // Use sharp to process the image
    let image = sharp(buffer);

    // Resize the image if width/height is provided
    if (width || height) {
      image = image.resize(width, height);
    }

    // Convert to the specified format
    let outputBuffer: Buffer;
    const suffix = width || height ? `-${width}x${height}` : "";
    const fileNameSuffix = `-${format}${suffix}`;

    switch (format) {
      case "png":
        outputBuffer = await image
          .toFormat("png")
          .png({ compressionLevel: 9, quality: 90 }) // Adjust compression and quality
          .toBuffer();
        break;
      case "webp":
        outputBuffer = await image.toFormat("webp").toBuffer();
        break;
      case "gif":
        outputBuffer = await image.toFormat("gif").toBuffer();
        break;
      case "avif":
        outputBuffer = await image.toFormat("avif").toBuffer();
        break;
      case "jpeg":
      default:
        outputBuffer = await image.toFormat("jpeg").toBuffer();
        break;
    }

    // Generate the new file name with suffix
    const newFileName =
      originalFileName.replace(originalExtension, "") +
      fileNameSuffix +
      originalExtension;

    // Determine the correct Content-Type based on the format
    const contentType = getContentType(format);

    // Return the processed image with a new name as a download link
    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${newFileName}"`,
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}

// Helper function to determine the content type for the image format
function getContentType(format: string): string {
  switch (format) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "avif":
      return "image/avif";
    case "jpeg":
    default:
      return "image/jpeg";
  }
}
