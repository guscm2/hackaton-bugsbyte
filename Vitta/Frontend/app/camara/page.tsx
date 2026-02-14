"use client";

import { useRouter } from "next/navigation";

import { useRef, useState } from "react";

import Webcam from "react-webcam";

export default function Camara() {
  const router = useRouter();

  const webcamRef = useRef<Webcam>(null);
  /*
  const webcam = () => {
    return (
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
      />
    );
  };
  */

  

  const capturePhoto = () => 
  {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          This is the camera page.
        </h1>


        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg"
          />
          <button
            onClick={capturePhoto}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Capture Photo react
          </button>
        </div>

      </main>
    </div>
  );
}
