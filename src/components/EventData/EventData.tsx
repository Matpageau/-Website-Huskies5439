import React from 'react';
import style from "./EventData.module.css";
import Link from 'next/link';
import { Calendar, ChartColumn, CirclePlay, MapPin } from "lucide-react";
import { getEventWLT } from '@/app/actions/eventScoring';

export type Team = {
  teamNumber: number;
  station: string;
};

export type MatchData = {
  description: string;
  number: number;
  teams: Team[];
  scoreRedFinal: number;
  scoreBlueFinal: number;
  tournamentLevel: string;
  matchVideoLink: string;
  actualStartTime: string;
};

interface award {
  name: string;
}

export type EventType = {
  code: string;
  name: string;
  venue: string;
  city: string;
  stateprov: string;
  country: string;
  dateStart: string;
  dateEnd: string;
  website: string;
};

type EventDataProps = {
  event: EventType;
  awards: award[];
  matchsData: MatchData[];
};

const EventData: React.FC<EventDataProps> = ({ event, awards, matchsData }) => {

  const eventWLT = getEventWLT(matchsData)

  const sortedMatchData = matchsData.sort((a, b) => {
    const levelOrder: { [key in "Qualification" | "Playoff"]: number } = {
      'Qualification': 0,
      'Playoff': 1
    };

    return levelOrder[a.tournamentLevel as "Qualification" | "Playoff"] - levelOrder[b.tournamentLevel as "Qualification" | "Playoff"];
  });

  const firstQualificationIndex = sortedMatchData.findIndex(match => match.tournamentLevel === 'Qualification');
  const firstPlayoffIndex = sortedMatchData.findIndex(match => match.tournamentLevel === 'Playoff');
  
  return (
    <div className={style.event_container}>
      <div className={style.event_infos}>
        {event.website ? 
          <Link className={`${style.font40} ${style.link}`} href={event.website} target="_blank">{event.name}</Link>
        :
          <p className={`${style.font40} ${style.link}`}>{event.name}</p>
        }
        <div className={style.iconText}>
          <MapPin />
          <p className={style.font20}>{event.city}, {event.stateprov}, {event.country}</p>
        </div>
        <div className={style.iconText}>
          <Calendar />
          <p className={style.font20}>{new Date(event.dateStart).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} au {new Date(event.dateEnd).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} {event.dateEnd.split("-")[0]}</p>
        </div>
        <div className={style.iconText}>
          <ChartColumn />
          <p className={style.font20}>{eventWLT.win} vitoire{eventWLT.win > 1 ? "s" : ""} {eventWLT.lose} défaite{eventWLT.lose > 1 ? "s" : ""} {eventWLT.tie} égalitée{eventWLT.tie > 1 ? "s" : ""}</p>
        </div>
        {awards.length > 0 ?
          <div className={style.reward_container}>
            <h2>Prix remporté{awards.length > 1 ? "s" : ""}</h2>
            <ul>
              {awards.map((award: award, index: number) => (
                <li key={index}>{award.name}</li>
              ))}
            </ul>
          </div>
        :
          <></>
        }
      </div>
      {sortedMatchData.length > 0 ?
        <div className={style.event_stats}>
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
            
            {sortedMatchData.map((match, index) => (
              <React.Fragment key={index}>
                {index === firstPlayoffIndex && (
                  <tr>
                    <th colSpan={10} className={style.specialRow}>Finales</th>
                  </tr>
                )}
                <tr>
                  <td>{match.matchVideoLink ? <Link href={match.matchVideoLink} target="_blank"><CirclePlay color='Blue' height={15} /></Link> : <></>}</td>
                  <td>{match.description}</td>
                  {/* Red Alliance Teams in Separate Cells with Red Background */}
                  {match.teams.filter(team => team.station.startsWith("Red")).map((team, redIndex) => (
                    <td key={`red-${redIndex}`} className={`${style.redAlliance} ${match.scoreRedFinal > match.scoreBlueFinal ? style.winner : ""} ${team.teamNumber === 5439 ? style.currentTeam : ""}`}>{team.teamNumber}</td>
                  ))}
                  {/* Blue Alliance Teams in Separate Cells with Blue Background */}
                  {match.teams.filter(team => team.station.startsWith("Blue")).map((team, blueIndex) => (
                    <td key={`blue-${blueIndex}`} className={`${style.blueAlliance} ${match.scoreBlueFinal > match.scoreRedFinal ? style.winner : ""} ${team.teamNumber === 5439 ? style.currentTeam : ""}`}>{team.teamNumber}</td>
                  ))}
                  {/* Scores */}
                  <td className={`${style.redAlliance} ${match.scoreRedFinal > match.scoreBlueFinal ? style.winner : ""} ${match.teams.find(team => team.teamNumber === 5439 && team.station.startsWith("Red")) ? style.currentTeam : ""}`}>{match.scoreRedFinal}</td>
                  <td className={`${style.blueAlliance} ${match.scoreBlueFinal > match.scoreRedFinal ? style.winner : ""} ${match.teams.find(team => team.teamNumber === 5439 && team.station.startsWith("Blue")) ? style.currentTeam : ""}`}>{match.scoreBlueFinal}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      :
      <p>Aucun match joué</p>
      }
    </div>
  );
};

export default EventData;
