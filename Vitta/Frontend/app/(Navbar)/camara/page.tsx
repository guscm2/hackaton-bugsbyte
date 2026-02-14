"use client";

import { useRouter } from "next/navigation";

import { useCallback, useRef, useState } from "react";

import Webcam from "react-webcam";
import { savePhotoAndMetadata } from "./photoActions";

import { saveVideoAction } from "./videoActions";


export default function Camara() 
{
  const router = useRouter();

  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const videoConstraints = 
  {
    width : 1280,
    height : 720,
    facingMode: facingMode,
  };

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
        {
            const recoder = new MediaRecorder(stream, { mimeType: "video/webm" });

            const chunks : Blob[] = [];

            recoder.ondataavailable = (event) =>
            {
                if (event.data.size > 0)                
                {
                    chunks.push(event.data);
                }
            }

            recoder.onstop = () =>
            {
                const videoBlob = new Blob(chunks, { type: "video/webm" });

                setVideoBlob(videoBlob);
                blobToFormData(videoBlob);
            }
            recoder.start();
            mediaRecorderRef.current = recoder;
        }
    };


    const stopRecording = useCallback(() => 
    {
        setIsRecording(false);
  
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") 
        {
            // Isto dispara o evento 'onstop' que definimos lá em baixo
            mediaRecorderRef.current.stop();
        }
    }, []);


    const switchCamera = () => 
    {
        setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    }

    const toggleFlash = () => {
    // Lógica para ativar/desativar o flash (se suportado pelo dispositivo)
    }

    const blobToFormData = async (videoBlob: Blob) => 
    {
        const formData = new FormData();

        const file = new File([videoBlob], `recording-${Date.now()}.webm`, { type: "video/webm" });
        formData.append("video", file);

        console.log("FormData prepared for upload:", formData);

        const result = await saveVideoAction(formData);

        if (result.success) {
          console.log("Video saved successfully:", result);
        } else {
          console.error("Failed to save video:", result.error);
        }
     
    }





  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">


        <div className="flex flex-col items-center">
          <Webcam
            audio={mode === "video"}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg"
            videoConstraints={videoConstraints}
          />
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <button 
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            onClick = {() => setMode(mode === "photo" ? "video" : "photo")}
          >
            Switch to {mode === "photo" ? "Video" : "Photo"} Mode
          </button>

          {mode === "photo" && (
            <>
            <button 
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
              onClick={capturePhoto}>
              Capture Photo
            </button>

            <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                onClick={switchCamera}>
                Switch Camera
            </button>
            <button 
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]" 
                onClick={toggleFlash}>
                Toggle Flash
            </button>
            </>
          )}

          {mode === "video" && (
            <>
              <button 
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
                onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>

              <button 
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]" 
                onClick={switchCamera}>
                Switch Camera
              </button>

              <button 
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]" 
                onClick={toggleFlash}>
                Toggle Flash
              </button>
            </>
          )}
        </div>



      </main>
    </div>
  );

      
}
