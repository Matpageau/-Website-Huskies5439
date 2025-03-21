import { Match } from "@/Utils/types/match";

export function getEventWLT(mathchsData: Match[]) {
  
  let winCount = 0;
  let loseCount = 0;
  let tieCount = 0;
  
  mathchsData.forEach(match => {  
    const alliance = Object.keys(match.alliances).find(alliance => match.alliances[alliance as "blue" | "red"].team_keys.includes("frc5439"))

    if(alliance == match.winning_alliance) {
      winCount ++
    }else if(alliance != match.winning_alliance && match.winning_alliance != null) {
      loseCount ++
    }else{
      tieCount ++
    }
    
  });
  return {win: winCount, lose: loseCount, tie: tieCount}
}