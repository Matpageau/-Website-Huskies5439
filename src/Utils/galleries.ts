import photoYearsGallery from "@/data/photoYearsGallery.json" assert { type: "json" };
import teamGallery from "@/data/teamGallery.json" assert { type: "json"};

type PhotoYearGallery = {
  [year: string]: string[];
};

type TeamGallery = {
  mentors: string[] | []
  students: string[] | []
}

const typedYearsGallery: PhotoYearGallery = photoYearsGallery;
const typedTeamGallery: TeamGallery = teamGallery

export async function getYearPhotos(year: string): Promise<string[]> {
  return typedYearsGallery[year] || [];
}

export async function getMentorsPhotos(): Promise<string[]> {
  return typedTeamGallery.mentors || [] 
}

export async function getStudentsPhotos(): Promise<string[]> {
  return typedTeamGallery.students || [] 
}