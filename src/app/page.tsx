/* eslint-disable @next/next/no-img-element */
import "./accueil.css";

export default async function Home() {
  return (
    <>
      <div className="presentation-container">
        <h1 className="page-title">Huskies 5439</h1>
        <img className="team-picture" src="/images/equipe2023.jpg" alt="equipe2023" />
      </div>
      <div className="left-box presentation-box">
        <img className="presentation-picture" src="/images/robotStation.jpg" alt="Robot station" />
        <p className="presentation-text pad-right">
          L’équipe des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe
          des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe des
          Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg.{" "}
        </p>
      </div>
      <div className="right-box presentation-box">
        <p className="presentation-text pad-left">
          L’équipe des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe
          des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe des
          Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg.{" "}
        </p>
      <img className="presentation-picture" src="/images/robotSuspendu.jpg" alt="Robot station" />
      </div>
    </>
  );
}
