import React, { lazy, Suspense } from 'react';
import style from "./EventData.module.css";
import Link from 'next/link';
import { Calendar, ChartColumn, MapPin } from "lucide-react";
import { getEventWLT } from '@/app/actions/eventScoring';
import { Event } from '@/Utils/types/event';
import { getMatchsResults } from '@/app/actions/api/get-matchs-results';
import { Match } from '@/Utils/types/match';
import { getEvent } from '@/app/actions/api/get-event';
import { getAwards } from '@/app/actions/api/get-awards';
import { Award } from '@/Utils/types/award';

const EventStatsBoard = lazy(() => import("./EventStatsBoard/EventStatsBoard"));

interface EventProp {
  event_code: string
}

const EventData: React.FC<EventProp> = async ({ event_code }) => {
  const [matchsData, event, awards]: [Match[] | null, Event | null, Award[] | null] = await Promise.all([
    getMatchsResults(event_code),
    getEvent(event_code),
    getAwards(event_code),
  ]);  

  if(matchsData == null || event == null || awards == null) {
    return
  }

  const eventWLT = getEventWLT(matchsData)  

  const sortedMatchData = matchsData.sort((a, b) => {
    // Priority order for comp_level
    const compLevelOrder: { [key: string]: number } = {
      qm: 1,
      qf: 2,
      sf: 3,
      f: 4
    };
  
    const levelDifference = compLevelOrder[a.comp_level] - compLevelOrder[b.comp_level];
    if (levelDifference !== 0) {
      return levelDifference;
    }

    if (a.comp_level === "qm" && b.comp_level === "qm") {
      return a.match_number - b.match_number;
    }

    if (a.comp_level === "qf" && b.comp_level === "qf") {
      return a.set_number - b.set_number;
    }
  
    if (a.comp_level === "sf" && b.comp_level === "sf") {
      return a.set_number - b.set_number;
    }

    if (a.comp_level === "f" && b.comp_level === "f") {
      return a.set_number - b.set_number;
    }

    return a.match_number - b.match_number;
  });
  
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
          <p className={style.font20}>{event.city}, {event.state_prov}, {event.country}</p>
        </div>
        <div className={style.iconText}>
          <Calendar />
          <p className={style.font20}>{new Date(event.start_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} au {new Date(event.end_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} {event.end_date.split("-")[0]}</p>
        </div>
        <div className={style.iconText}>
          <ChartColumn />
          <p className={style.font20}>{eventWLT.win} vitoire{eventWLT.win > 1 ? "s" : ""} {eventWLT.lose} défaite{eventWLT.lose > 1 ? "s" : ""} {eventWLT.tie} égalitée{eventWLT.tie > 1 ? "s" : ""}</p>
        </div>
        {awards.length > 0 ?
          <div className={style.reward_container}>
            <h2>Prix remporté{awards.length > 1 ? "s" : ""}</h2>
            <ul>
              {awards.map((award: Award, index: number) => (
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
          <Suspense fallback={<p>Chargement des statistiques...</p>}>
            <EventStatsBoard matchsDatas={sortedMatchData} event_code={event_code}/>
          </Suspense>
        </div>
      :
        <p>Aucun match joué</p>
      }
    </div>
  );
};

export default EventData;
