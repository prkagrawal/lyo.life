// import Image from "next/image";

const APP_LIST = [
  {
    id: 1,
    title: "Image Cropper",
    description: "Crop and resize images with ease.",
    image: "/app-icons/crop.png",
    link: "/image-cropper"
  },
  {
    id: 2,
    title: "File Converter",
    description: "Convert files to different formats easily.",
    image: "/app-icons/crop.png",
    link: "/file-convertor"
  },
  {
    id: 3,
    title: "PDF Splitter & Combiner",
    description: "Split and combine PDF files quickly.",
    image: "/app-icons/crop.png",
    link: "/pdf-splittor"
  },
  {
    id: 4,
    title: "Audio Recorder",
    description: "Record audio with a simple interface.",
    image: "/app-icons/crop.png",
    link: "#"
  },
  {
    id: 5,
    title: "Video Recorder",
    description: "Record video directly from your browser.",
    image: "/app-icons/crop.png",
    link: "#"
  },
  {
    id: 6,
    title: "To-Do App",
    description: "Manage your tasks and stay organized.",
    image: "/app-icons/crop.png",
    link: "#"
  },
  {
    id: 7,
    title: "Notepad",
    description: "Simple notepad for quick notes.",
    image: "/app-icons/crop.png",
    link: "#"
  }
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 row-start-2 items-center sm:items-start">
        {APP_LIST.map((app) => (
          <div
            key={app.id}
            className="group block space-y-1.5 px-5 py-3 max-w-sm rounded-lg bg-gray-1000 hover:bg-gray-950 border border-gray-700"
          >
            <a href={app.link}>
              <img className="rounded-t-lg" src={app.image} alt={app.title} />
            </a>
            <div className="p-5">
              <a href={app.link}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {app.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {app.description}
              </p>
            </div>
          </div>
        ))}
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
