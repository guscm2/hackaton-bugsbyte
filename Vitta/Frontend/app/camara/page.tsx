"use client";

import { useRouter } from "next/navigation";

import { useCallback, useRef, useState } from "react";

import Webcam from "react-webcam";
import { savePhotoAndMetadata } from "./actions";



export default function Camara() 
{
  const router = useRouter();

  const webcamRef = useRef<Webcam>(null);

  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);


  const capturePhoto = useCallback( async() => 
  {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) 
    {
        const result = await savePhotoAndMetadata(imageSrc);

        if (result.success) 
        {
          console.log("Photo saved successfully:", result.data);
        } 
        else 
        {
          console.error("Failed to save photo.");
        }
    } 
    else 
    {
      console.error("Failed to capture photo.");
    }

  } , [webcamRef]);

const startRecording = () => 
{
    setIsRecording(true);
    const stream = webcamRef.current?.stream;   
    if (stream)
    {      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(videoBlob);
        saveVideoAndMetadata(videoBlob);
      };

      mediaRecorder.start();
    }
};

const stopRecording = () => 
{
  setIsRecording(false);
};

const switchCamera = () => {
  // Lógica para alternar entre câmeras (frontal e traseira)
}

const toggleFlash = () => {
  // Lógica para ativar/desativar o flash (se suportado pelo dispositivo)
}

const saveVideoAndMetadata = async (videoBlob: Blob) => {
  // Lógica para salvar o vídeo e seus metadados, similar ao processo de fotos
}





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
