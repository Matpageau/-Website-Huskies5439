import React from 'react'
import style from "./EventStatsBoard.module.css"
import { Match } from '@/Utils/types/match'
import { CirclePlay } from 'lucide-react'
import Link from 'next/link'

interface EventBoardProps {
  matchsDatas: Match[]
  event_code: string
}

const EventStatsBoard: React.FC<EventBoardProps> = ({matchsDatas, event_code}) => {
  const firstQualificationIndex = matchsDatas.findIndex(match => match.comp_level === 'qm');
  const firstQfIndex = matchsDatas.findIndex(match => match.comp_level === 'qf');
  const firstSfIndex = matchsDatas.findIndex(match => match.comp_level === 'sf');
  const firstFIndex = matchsDatas.findIndex(match => match.comp_level === 'f');

  const getMatchLabel = (comp_level: string, match_number: number, match_set_number: number) => {
    switch (comp_level) {
      case "qf":
        return `Quart ${match_number}`;
      case "sf":
        return `Demie-finale ${match_set_number}`;
      case "f":
        return `Finale ${match_number}`;
      default:
        return `Qualification ${match_number}`;
    }
  }; 
  
  return (
    <table className={style.table}>
      <thead>
        <tr className={style.visible_lg}>
          <th><CirclePlay color='Blue' height={15} className='icon'/></th>
          <th className="font20">Match</th>
          <th colSpan={3} className="font20">Alliance Rouge</th>
          <th colSpan={3} className="font20">Alliance Bleu</th>
          <th colSpan={2} className="font20">Scores</th>
        </tr>
        <tr className={style.hidden_lg}>
          <th rowSpan={2}><CirclePlay color='Blue' height={15} className='icon'/></th>
          <th rowSpan={2} className="font20">Match</th>
          <th colSpan={6} className="font20">Alliance Rouge</th>
          <th colSpan={2} className="font20">Score Rouge</th>
        </tr>
        <tr className={style.hidden_lg}>
          <th colSpan={6} className="font20">Alliance Bleu</th>
          <th colSpan={2} className="font20">Score Bleu</th>
        </tr>

      </thead>
      <tbody>
        {firstQualificationIndex !== -1 && (
          <tr>
            <th colSpan={10} className="font20">Qualifications</th>
          </tr>
        )}
        
        {matchsDatas.map((match, index) => (
          <React.Fragment key={index}>
            {index === firstQfIndex && (
              <tr>
                <th colSpan={10} className="font20">Quart de finales</th>
              </tr>
            )}
            {index === firstSfIndex && (
              <tr>
                <th colSpan={10} className="font20">Demis finales</th>
              </tr>
            )}
            {index === firstFIndex && (
              <tr>
                <th colSpan={10} className="font20">Finales</th>
              </tr>
            )}
            <tr className={style.visible_lg}>
              <td>{match.videos[0] ? <Link href={`https://youtube.com/watch?v=${match.videos[0].key}`} target="_blank"><CirclePlay color='Blue' height={15} className='icon'/></Link> : <></>}</td>
              <td className={`font16`}>{getMatchLabel(match.comp_level, match.match_number, match.set_number)}</td>

              {match.alliances.red.team_keys.map((team: string) => (
                <td key={team} className={`font16 ${style.redAlliance} ${match.winning_alliance == "red" ? style.winner : ""} ${team == "frc5439" ? style.currentTeam : ""}`}><Link className="link" href={`https://www.thebluealliance.com/team/${team.replace("frc", "")}/${event_code.slice(0,4)}`}>{team.replace("frc", "")}</Link></td>
              ))}
  
              {match.alliances.blue.team_keys.map((team: string) => (
                <td key={team} className={`font16 ${style.blueAlliance} ${match.winning_alliance == "blue" ? style.winner : ""} ${team == "frc5439" ? style.currentTeam : ""}`}><Link className="link" href={`https://www.thebluealliance.com/team/${team.replace("frc", "")}/${event_code.slice(0,4)}`}>{team.replace("frc", "")}</Link></td>
              ))}

              <td className={`font16 ${style.redAlliance} ${match.winning_alliance == "red" ? style.winner : ""} ${match.alliances.red.team_keys.includes("frc5439") ? style.currentTeam : ""}`}>{match.score_breakdown.red.totalPoints}</td>
              <td className={`font16 ${style.blueAlliance} ${match.winning_alliance == "blue" ? style.winner : ""} ${match.alliances.blue.team_keys.includes("frc5439") ? style.currentTeam : ""}`}>{match.score_breakdown.blue.totalPoints}</td>
            </tr>
            <tr className={style.hidden_lg}>
              <td rowSpan={2}>{match.videos[0] ? <Link href={`https://youtube.com/watch?v=${match.videos[0].key}`} target="_blank"><CirclePlay color='Blue' height={15} className='icon'/></Link> : <></>}</td>
              <td rowSpan={2} className={`font16`}>{getMatchLabel(match.comp_level, match.match_number, match.set_number)}</td>

              {match.alliances.red.team_keys.map((team: string) => (
                <td colSpan={2} key={team} className={`font16 ${style.redAlliance} ${match.winning_alliance == "red" ? style.winner : ""} ${team == "frc5439" ? style.currentTeam : ""}`}><Link className="link" href={`https://www.thebluealliance.com/team/${team.replace("frc", "")}/${event_code.slice(0,4)}`}>{team.replace("frc", "")}</Link></td>
              ))}

              <td colSpan={2} className={`font16 ${style.redAlliance} ${match.winning_alliance == "red" ? style.winner : ""} ${match.alliances.red.team_keys.includes("frc5439") ? style.currentTeam : ""}`}>{match.score_breakdown.red.totalPoints}</td>
            </tr>
            <tr className={style.hidden_lg}>
              {match.alliances.blue.team_keys.map((team: string) => (
                <td colSpan={2} key={team} className={`font16 ${style.blueAlliance} ${match.winning_alliance == "blue" ? style.winner : ""} ${team == "frc5439" ? style.currentTeam : ""}`}><Link className="link" href={`https://www.thebluealliance.com/team/${team.replace("frc", "")}/${event_code.slice(0,4)}`}>{team.replace("frc", "")}</Link></td>
              ))}

              <td colSpan={2} className={`font16 ${style.blueAlliance} ${match.winning_alliance == "blue" ? style.winner : ""} ${match.alliances.blue.team_keys.includes("frc5439") ? style.currentTeam : ""}`}>{match.score_breakdown.blue.totalPoints}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default EventStatsBoard