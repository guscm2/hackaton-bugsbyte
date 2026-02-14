"use server";

import { writeFile, readFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function savePhotoAndMetadata(base64Data: string) 
{
  const publicDir = path.join(process.cwd(), "public", "uploads", "contributions", "photos");
  const jsonPath = path.join(process.cwd(), "fotos.json");

  // 1. Garantir que a pasta public/photos existe
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    // 2. Criar um nome único para o ficheiro
    const fileName = `capture-${Date.now()}.png`;
    const filePath = path.join(publicDir, fileName);

    // 3. Remover o prefixo "data:image/png;base64," e converter para Buffer
    const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Image, "base64");

    // 4. Guardar a imagem física na pasta public/photos
    await writeFile(filePath, buffer);

    // 5. Atualizar o ficheiro JSON com os metadados
    let fotos = [];
    try {
      const fileContent = await readFile(jsonPath, "utf-8");
      fotos = JSON.parse(fileContent);
    } catch (e) {
      fotos = [];
    }

    const novaEntrada = {
      id: Date.now(),
      fileName: fileName,
      path: `/uploads/contributions/photos/${fileName}`, // URL relativo para usar no componente <Image />
      date: new Date().toISOString(),
    };

    fotos.push(novaEntrada);
    await writeFile(jsonPath, JSON.stringify(fotos, null, 2));

    return { success: true, data: novaEntrada };
  } catch (error) {
    console.error("Erro ao processar captura:", error);
    return { success: false };
  }
}
