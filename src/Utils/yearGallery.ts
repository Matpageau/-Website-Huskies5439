import fs from "fs/promises";
import path from "path";

export async function getYearPhotos(year: string) {
  try {
    const files = await fs.readdir(path.join(process.cwd(), `/public/images/${year}/gallery`));

    const filePaths = files.map(file => `/images/${year}/gallery/${file}`);

    return filePaths;
  } catch (error) {
    console.error("Une erreur est survenue en voulant chercher la gallerie photo", error);
    return [];
  }
}
