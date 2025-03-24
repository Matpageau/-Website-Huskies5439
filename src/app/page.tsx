/* eslint-disable @next/next/no-img-element */
import "./accueil.css";

export default async function Home() {
  return (
    <>
      <div className="presentation_container">
        <h1 className="page-title">Huskies 5439</h1>
        <img className="team_picture" src="/images/equipe2023.jpg" alt="equipe2023" />
      </div>
      <div className="left_box presentation_box">
        <img className="presentation_picture" src="/images/robotStation.jpg" alt="Robot station" />
        <p className="presentation_text">
          L’équipe des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe
          des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe des
          Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg.{" "}
        </p>
      </div>
      <div className="right_box presentation_box">
        <p className="presentation_text">
          L’équipe des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe
          des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe des
          Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg.{" "}
        </p>
      <img className="presentation_picture" src="/images/robotSuspendu.jpg" alt="Robot station" />
      </div>
    </>
  );
}
