import fs from "fs";
import path from "path";

const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
const yearGalleryResult = {};
const teamGalleryResult = {};

for (const year of years) {
  const dir = path.join(process.cwd(), `public/images/years/${year}/gallery`);
  try {
    const files = fs.readdirSync(dir);
    yearGalleryResult[year] = files.map(file => `/images/years/${year}/gallery/${file}`);
  } catch {
    yearGalleryResult[year] = [];
  }
}

const baseDir = path.join(process.cwd(), "public/images/team")
const dirList = fs.readdirSync(baseDir)
dirList.forEach(dir => {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), `public/images/team/${dir}`))
    teamGalleryResult[dir] = files.map(file => `/images/team/${dir}/${file}`)
  } catch {
    teamGalleryResult[dir] = []
  }
});

fs.writeFileSync("src/data/photoYearGallery.json", JSON.stringify(yearGalleryResult, null, 2));
console.log("✅ photoYearGallery.json generated.");

fs.writeFileSync("src/data/teamGallery.json", JSON.stringify(teamGalleryResult, null, 2));
console.log("✅ teamGallery.json generated.");
