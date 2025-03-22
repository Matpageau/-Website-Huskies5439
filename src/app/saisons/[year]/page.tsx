/* eslint-disable @next/next/no-img-element */
import { getTeamEvents } from "@/app/actions/api/get-team-events";
import SeasonSelector from "@/components/SeasonSelector/SeasonSelector";
import Separator from "@/components/Separator/Separator";
import { getYearData } from "@/Utils/yearData";
import React, { Suspense } from "react"
import style from "./saisons.module.css"
import { MapPin, School } from "lucide-react";
import YouTubeEmbed from "@/components/YoutubeEmbed/YoutubeEmbed";
import EventData from "@/components/EventData/EventData";
import { getEventWLT } from "@/app/actions/eventScoring";
import { getMatchsResults } from "@/app/actions/api/get-matchs-results";
import Link from "next/link";

export default async function Saisons({
  params,
}: { 
  params: Promise<{ year: string }>
}) {
  let totalWin = 0
  let totalLose = 0
  let totalTie = 0
  const { year } = await params;
  const [yearData, teamEventsCodes] = await Promise.all([
    getYearData(year),
    getTeamEvents(year),
  ]);
  

  for (const event of teamEventsCodes) {
    const matchsData = await getMatchsResults(event)
    const record = getEventWLT(matchsData)
    
    totalWin += record.win
    totalLose += record.lose
    totalTie += record.tie
  }
  
  if(yearData == undefined) {
    return
  }
  
  return (
    <>
      <div className="presentation_container">
        <h1 className="page-title">Nos Saisons</h1>
      </div>
      <SeasonSelector year={year}></SeasonSelector>
      <div className={style.content}>
        <div className={style.game_presentation_container}>
          <img className={style.game_logo} src={yearData.gameLogo} alt="gameLogo" />
          <div>
            <h1 className="font64">{yearData.gameName.toUpperCase()}</h1>
            <p className={`font20 semi_bold`}>{yearData.gameDescription}</p>
          </div>
        </div>
        <Separator />
        <div className={style.robot_container}>
          <div>
            <div className={style.team_infos_container}>
              <div className={style.team_profile}>
                {yearData.teamAvatar != "" ? 
                  <img src={"data:image/png;base64," + yearData.teamAvatar} className={style.team_logo} alt="avatar huskies" />
                  : 
                   <></>
                }
                <div className={style.teamNameTBA}>
                  <h1 className="font64">Huskies 5439</h1>
                  <Link href={`https://thebluealliance.com/team/5439/${year}`} className="link" target="_blank">thebluealliance.com</Link>
                </div>
              </div>
              <div className={style.team_location_container}>
                <div className={`${style.iconText} font20`}>
                  <School className="icon"/>
                  <p>Polyvalente de Charlesbourg</p>
                </div>
                <div className={`${style.iconText} font20`}>
                  <MapPin className="icon"/>
                  <p>Québec, Québec, Canada</p>
                </div>
              </div>
            </div>
            <div className={style.robot_caracteristic_container}>
              <h1 className="font40">Caractéristiques du robot</h1>
              <ul>
                {yearData.robotAttribut.map((attribute, index) => (
                  <li key={index} className="font20">{attribute}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style.robotImage}>
            <img src={yearData.robotImage} className={style.robotImage} alt={year + "robot"} />
            {yearData.robotName != "" ? 
              <h4 className={`font20 ${style.robotName}`}>Nom du robot: {yearData.robotName}</h4>
              :
              <></>
            }
          </div>
        </div>
        {yearData.revealId != "" ?
          <YouTubeEmbed videoId={yearData.revealId} />
        :
          <></>
        }
        <Separator />
        <div className={style.event_result_container}>
          <h1 className="font40">Résultats d&apos;évènements</h1>
          <p className="font20">L&apos;équipe a terminé la saison avec {totalWin} victoires, {totalLose} défaites et {totalTie} égalitées</p>
          <Suspense fallback={<p>Chargement des compétitons...</p>}>
            {teamEventsCodes.map((event: string, index: number) => (
              <EventData key={index} event_code={event}/>
            ))}
          </Suspense>
        </div>
        <Separator />
        {yearData.githubLink != "" || yearData.cadLink != "" ?
          <div className={style.ressources_container}>
            <h1 className="font40">Ressources</h1>
            {yearData.githubLink != "" ? 
              <Link className="link font20" href={yearData.githubLink} target="_blank">Github</Link>
              :
              <></>
            }
            {yearData.cadLink != "" ?
              <Link className="link font20" href={yearData.cadLink} target="_blank">CAD</Link>
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
