import fs from "fs";
import path from "path";

export async function getYearPhotos(year: string) {
  try {

    const dir = path.resolve(`./public/images/${year}/gallery`)
    const fileNames = fs.readdirSync(dir)
    const images = fileNames.map(name => `/images/${year}/gallery/${name}`)
    
    // const files = await fs.readdir(path.join(process.cwd(), `/public/images/${year}/gallery`));
    // const filePaths = files.map(file => `/images/${year}/gallery/${file}`);
    console.log(images);
    
    return images;
  } catch (error) {
    console.error("Une erreur est survenue en voulant chercher la gallerie photo", error);
    return [];
  }
}
