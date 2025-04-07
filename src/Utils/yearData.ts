import teamYearsData from '../data/teamYearsdata.json'

export interface YearData {
  year: string;
  gameName: string;
  gameDescription: string;
  gameLogo: string;
  teamAvatar: string;
  robotAttribut: string[];
  robotImage: string;
  robotName: string;
  revealId: string;
  githubLink: string;
  cadLink: string
}

export async function getYearData(year: string): Promise<YearData | undefined> {
  try {
    return teamYearsData.find((data) => data.year === year)
  } catch (error) {
    console.error("Une erreur est survenue pendant le chargements des données de l'année", error)
    return undefined
  }
}