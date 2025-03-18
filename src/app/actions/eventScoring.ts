import { MatchData, Team } from "@/components/EventData/EventData";

export function getEventWLT(mathchsData: MatchData[]) {
  let winCount = 0;
  let loseCount = 0;
  let tieCount = 0;
  
  mathchsData.forEach(match => {    
    const alliance = match.teams.find((team: Team) => team.teamNumber == 5439)?.station
    if (alliance && (alliance.startsWith("Red") !== (match.scoreRedFinal < match.scoreBlueFinal))) {
      winCount++;
    } else if (alliance && (alliance.startsWith("Red") !== (match.scoreRedFinal > match.scoreBlueFinal))) {
      loseCount++;
    } else {
      tieCount ++
    }
  });
  return {win: winCount, lose: loseCount, tie: tieCount}
}