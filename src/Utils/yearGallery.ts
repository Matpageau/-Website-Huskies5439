type PhotoGallery = {
  [year: string]: string[];
};

import photoGallery from "@/data/photoGallery.json" assert { type: "json" };

const typedGallery: PhotoGallery = photoGallery;

export async function getYearPhotos(year: string): Promise<string[]> {
  return typedGallery[year] || [];
}