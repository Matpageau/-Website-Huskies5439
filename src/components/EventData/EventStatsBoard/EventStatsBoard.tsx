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
        <tr>
          <th>Vidéos</th>
          <th>Match</th>
          <th colSpan={3}>Red Alliance</th>
          <th colSpan={3}>Blue Alliance</th>
          <th colSpan={2}>Scores</th>
        </tr>
      </thead>
      <tbody>
        {firstQualificationIndex !== -1 && (
          <tr>
            <th colSpan={10} className={style.specialRow}>Qualifications</th>
          </tr>
        )}
        
        {matchsDatas.map((match, index) => (
          <React.Fragment key={index}>
            {index === firstQfIndex && (
              <tr>
                <th colSpan={10} className={style.specialRow}>Quart de finales</th>
              </tr>
            )}
            {index === firstSfIndex && (
              <tr>
                <th colSpan={10} className={style.specialRow}>Demis finales</th>
              </tr>
            )}
            {index === firstFIndex && (
              <tr>
                <th colSpan={10} className={style.specialRow}>Finales</th>
              </tr>
            )}
            <tr>
              <td>{match.videos[0] ? <Link href={`https://youtube.com/watch?v=${match.videos[0].key}`} target="_blank"><CirclePlay color='Blue' height={15} /></Link> : <></>}</td>
              <td>{getMatchLabel(match.comp_level, match.match_number, match.set_number)}</td>
              {/* Red Alliance Teams in Separate Cells with Red Background */}
              {match.alliances.red.team_keys.map((team: string) => (
                <td key={team} className={`${style.redAlliance} ${match.winning_alliance == "red" ? style.winner : ""} ${team == "frc5439" ? style.currentTeam : ""}`}><Link className={style.link} href={`https://www.thebluealliance.com/team/${team.replace("frc", "")}/${event_code.slice(0,4)}`}>{team.replace("frc", "")}</Link></td>
              ))}
              {/* Red Alliance Teams in Separate Cells with Red Background */}
              {match.alliances.blue.team_keys.map((team: string) => (
                <td key={team} className={`${style.blueAlliance} ${match.winning_alliance == "blue" ? style.winner : ""} ${team == "frc5439" ? style.currentTeam : ""}`}><Link className={style.link} href={`https://www.thebluealliance.com/team/${team.replace("frc", "")}/${event_code.slice(0,4)}`}>{team.replace("frc", "")}</Link></td>
              ))}
              {/* Scores */}
              <td className={`${style.redAlliance} ${match.winning_alliance == "red" ? style.winner : ""} ${match.alliances.red.team_keys.includes("frc5439") ? style.currentTeam : ""}`}>{match.score_breakdown.red.totalPoints}</td>
              <td className={`${style.blueAlliance} ${match.winning_alliance == "blue" ? style.winner : ""} ${match.alliances.blue.team_keys.includes("frc5439") ? style.currentTeam : ""}`}>{match.score_breakdown.blue.totalPoints}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default EventStatsBoard