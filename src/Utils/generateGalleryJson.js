import fs from "fs";
import path from "path";

const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
const result = {};

for (const year of years) {
  const dir = path.join(process.cwd(), `public/images/years/${year}/gallery`);
  try {
    const files = fs.readdirSync(dir);
    result[year] = files.map(file => `/images/years/${year}/gallery/${file}`);
  } catch {
    result[year] = [];
  }
}

fs.writeFileSync("src/data/photoGallery.json", JSON.stringify(result, null, 2));
console.log("✅ photoGallery.json generated.");
