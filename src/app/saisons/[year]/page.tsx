import SeasonSelector from "../../../components/Saisons/SeasonSelector/SeasonSelector";
import React, { Suspense } from "react"
import "./saisons.css"
import SaisonContent from "./seasonContent";

export default async function Saisons({
  params,
}: { 
  params: Promise<{ year: string }>
}) {
  const { year } = await params;
  
  return (
    <>
      <meta name="description" content="Saison Huskies 5439"/>
      <div className="presentation-container">
        <h1 className="page-title">Nos Saisons</h1>
        <SeasonSelector year={year}></SeasonSelector>
      </div>
      <Suspense fallback={<h2 className="Loading-text">Chargement de la saison...</h2>}>
        <SaisonContent year={year}></SaisonContent>
      </Suspense>
    </>
  );
}