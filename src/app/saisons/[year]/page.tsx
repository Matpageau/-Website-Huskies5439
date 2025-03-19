/* eslint-disable @next/next/no-img-element */
import style from "../saisons.module.css"
import SeasonSelector from "@/components/SeasonSelector/SeasonSelector"
import React from "react"
import getTeamEvents from "../../actions/api/get-team-events"
import { getYearData } from "@/Utils/yearData"
import Link from "next/link"
import { School, MapPin } from "lucide-react"
import YoutubeEmbed from "@/components/YoutubeEmbed/YoutubeEmbed"
import EventData, { EventType, MatchData } from "@/components/EventData/EventData"
import getTeamAwards from "@/app/actions/api/get-team-awards"
import getMatchsResults from "@/app/actions/api/get-matchs-results"
import Separator from "@/components/Separator/Separator"
import { getEventWLT } from "@/app/actions/eventScoring"

export default async function Saisons({
  params,
}: { 
  params: Promise<{ year: string }>
}) {
  const { year } = await params;

  const events: EventType[] = await getTeamEvents({ year });
  const yearData = await getYearData(year);

  if (!events || !yearData) {
    return (
      <>
        <SeasonSelector year={year}></SeasonSelector>
        <div className="presentation_container">
          <h1 className="page-title">Nos Saisons</h1>
          <h2>Aucune compétition...</h2>
        </div>
      </>
    );
  }

  let totalWins = 0;
  let totalLosses = 0;
  let totalTies = 0;

  const eventResultsPromises = events.map(async (event: EventType) => {
    const datas = await getMatchsResults({ year, eventCode: event.code });
    const awards = await getTeamAwards({ year, eventCode: event.code});
    datas.Matches = datas.Matches.filter((match: MatchData) => match.actualStartTime != null)
     
    const eventWLT = getEventWLT(datas.Matches);

    totalWins += eventWLT.win;
    totalLosses += eventWLT.lose;
    totalTies += eventWLT.tie;

    return {matches: datas.Matches, award: awards.Awards}
  });

  const eventsDatas = await Promise.all(eventResultsPromises);
  
  return (
    <>
      <div className="presentation_container">
        <h1 className="page-title">Nos Saisons</h1>
      </div>
      <SeasonSelector year={year}></SeasonSelector>
      <div className={style.content}>
        <div className={style.game_presentation_container}>
          <img className={style.game_logo} src={yearData.gameLogo} alt="" />
          <div>
            <h1 className={style.font64}>{yearData.gameName.toUpperCase()}</h1>
            <p className={`${style.font20} ${style.semi_bold}`}>{yearData.gameDescription}</p>
          </div>
        </div>
        <Separator />
        <div className={style.robot_container}>
          <div className={style.left_infos}>
            <div className={style.team_infos_container}>
              <div className={style.team_profile}>
                {yearData.teamAvatar != "" ? 
                  <img src={"data:image/png;base64," + yearData.teamAvatar} className={style.team_logo} alt="avatar huskies" />
                  : 
                   <></>
                }
                <div className={style.teamNameTBA}>
                  <h1 className={style.font64}>Huskies 5439</h1>
                  <Link href={`https://thebluealliance.com/team/5439/${year}`} className={style.link} target="_blank">thebluealliance.com</Link>
                </div>
              </div>
              <div className={style.team_location_container}>
                <div className={style.iconText}>
                  <School />
                  <p>Polyvalente de Charlesbourg</p>
                </div>
                <div className={style.iconText}>
                  <MapPin />
                  <p>Québec, Québec, Canada</p>
                </div>
              </div>
            </div>
            <div className={style.robot_caracteristic_container}>
              <h1 className={style.font40}>Caractéristiques du robot</h1>
              <ul>
                {yearData.robotAttribut.map((attribute, index) => (
                  <li key={index} className={style.font20}>{attribute}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style.test}>
            <img src={yearData.robotImage} className={style.robotImage} alt={year + "robot"} />
            {yearData.robotName != "" ? 
              <h4 className={style.robotName}>Nom du robot: {yearData.robotName}</h4>
              :
              <></>
            }
          </div>
        </div>
        {yearData.revealId != "" ?
          <YoutubeEmbed videoId={yearData.revealId} />
        :
          <></>
        }
        <Separator />
        <div className={style.event_result_container}>
          <h1 className={style.font40}>Résultats d&apos;évènements</h1>
          <p className={style.font20}>L&apos;équipe a terminé la saison avec {totalWins} victoires, {totalLosses} défaites et {totalTies} égalitées</p>
          {events.map((event, index: number) => (
            <EventData key={index} event={event} matchsData={eventsDatas[index].matches} awards={eventsDatas[index].award}/>
          ))}
        </div>
        <Separator />
        {yearData.githubLink != "" || yearData.cadLink != "" ?
          <div className={style.ressources_container}>
            <h1 className={style.font40}>Ressources</h1>
            {yearData.githubLink != "" ? 
              <Link className={style.link} href={yearData.githubLink} target="_blank">Github</Link>
              :
              <></>
            }
            {yearData.cadLink != "" ?
              <Link className={style.link} href={yearData.cadLink} target="_blank">CAD</Link>
              :
              <></>
            }
            <Separator />
          </div>
        :
          <></>
        }
      </div>
    </>
  );
}
