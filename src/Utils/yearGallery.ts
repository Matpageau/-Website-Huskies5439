import fs from "fs/promises";
import path from "path";

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function getYearPhotos(year: string) {
  try {
    const files = await fs.readdir(path.join(process.cwd(), `/public/images/${year}/gallery`));

    const filePaths = files.map(file => `/images/${year}/gallery/${file}`);

    const randomizedFilePaths = shuffleArray(filePaths);
    return randomizedFilePaths;
  } catch (error) {
    console.error("Une erreur est survenue en voulant chercher la gallerie photo", error);
    return [];
  }
}
