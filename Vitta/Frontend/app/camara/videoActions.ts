"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function saveVideoAction(formData: FormData) {
  // 1. Extrair o ficheiro do FormData
  // O nome "video" deve coincidir com o que usaste no formData.append("video", ...)
  const file = formData.get("video") as File;

  if (!file) {
    return { success: false, error: "Nenhum ficheiro recebido." };
  }

  try {
    // 2. Definir o caminho da pasta (ex: public/uploads/videos)
    const uploadDir = path.join(process.cwd(), "public", "uploads", "videos");

    // 3. Garantir que a pasta existe (se não existir, cria-a)
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 4. Gerar um nome único ou usar o nome original
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // 5. Converter o ficheiro para Buffer (Linguagem que o Node.js entende)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 6. Escrever o ficheiro no disco
    await writeFile(filePath, buffer);

    console.log(`Vídeo guardado em: ${filePath}`);

    return { 
      success: true, 
      path: `/uploads/videos/${fileName}`,
      message: "Vídeo guardado com sucesso!" 
    };

  } catch (error) {
    console.error("Erro ao guardar o vídeo no servidor:", error);
    return { success: false, error: "Falha ao escrever o ficheiro." };
  }
}