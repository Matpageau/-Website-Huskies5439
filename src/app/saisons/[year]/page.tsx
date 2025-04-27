/* eslint-disable @next/next/no-img-element */
import { getTeamEvents } from "@/app/actions/api/get-team-events";
import SeasonSelector from "@/components/saisons/SeasonSelector/SeasonSelector";
import Separator from "@/components/base/Separator/Separator";
import { getYearData } from "@/Utils/yearData";
import React, { Suspense } from "react"
import "./saisons.css"
import { MapPin, School } from "lucide-react";
import YouTubeEmbed from "@/components/saisons/YoutubeEmbed/YoutubeEmbed";
import EventData from "@/components/saisons/EventData/EventData";
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
    return (
      <>
        <div className="presentation-container">
          <h1 className="page-title">Nos Saisons</h1>
        </div>
        <SeasonSelector year={year}></SeasonSelector>
        <h1 className="font64">Saison invalide...</h1>
      </>
    )
  }
  
  return (
    <>
      <div className="presentation-container">
        <h1 className="page-title">Nos Saisons</h1>
      </div>
      <SeasonSelector year={year}></SeasonSelector>
      <div className="content">
        <div className="game-presentation-container flex-row">
          <img className="game-logo" src={yearData.gameLogo} alt="gameLogo" />
          <div>
            <h1 className="font64">{yearData.gameName.toUpperCase()}</h1>
            <p className="font20 semi-bold">{yearData.gameDescription}</p>
          </div>
        </div>
        <Separator />
        <div className="robot-container flex-row">
          <div>
            <div className="team-infos-container">
              <div className="team-profile flex-row">
                {yearData.teamAvatar != "" ? 
                  <img src={"data:image/png;base64," + yearData.teamAvatar} className="team-logo" alt="avatar huskies" />
                  : 
                   <></>
                }
                <div className="teamNameTBA">
                  <h1 className="font64">Huskies 5439</h1>
                  <Link href={`https://thebluealliance.com/team/5439/${year}`} className="link" target="_blank">thebluealliance.com</Link>
                </div>
              </div>
              <div className="team-location-container">
                <div className="iconText font20 flex-row">
                  <School className="icon"/>
                  <p>Polyvalente de Charlesbourg</p>
                </div>
                <div className="iconText font20">
                  <MapPin className="icon"/>
                  <p>Québec, Québec, Canada</p>
                </div>
              </div>
            </div>
            <div className="robot-caracteristic-container">
              <h1 className="font40">Caractéristiques du robot</h1>
              <ul>
                {yearData.robotAttribut.map((attribute, index) => (
                  <li key={index} className="font20">{attribute}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="robotImage-container flex-col">
            <img src={yearData.robotImage} className="robotImage" alt={year + "robot"} />
            {yearData.robotName != "" ? 
              <h4 className="font20 robotName">Nom du robot: {yearData.robotName}</h4>
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
        <div className="event-result-container">
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
          <div className="flex-col ressource-container">
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
