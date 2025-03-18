/* eslint-disable @next/next/no-img-element */
import style from "./accueil.module.css";

export default async function Home() {
  return (
    <>
      <div className="presentation_container">
        <h1 className="page-title">Huskies 5439</h1>
        <img className={style.team_picture} src="/images/equipe2023.jpg" alt="equipe2023" />
      </div>
      <div className={`${style.left_box} ${style.presentation_box}`}>
        <img className={style.presentation_picture} src="/images/robotStation.jpg" alt="Robot station" />
        <p className={style.presentation_text}>
          L’équipe des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe
          des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe des
          Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg.{" "}
        </p>
      </div>
      <div className={`${style.right_box} ${style.presentation_box}`}>
        <p className={style.presentation_text}>
          L’équipe des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe
          des Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg. L’équipe des
          Huskies originaire de la ville de Québec au canada et plus spécifiquement de la polyvalente de Charlesbourg.{" "}
        </p>
      <img className={style.presentation_picture} src="/images/robotSuspendu.jpg" alt="Robot station" />
      </div>
    </>
  );
}
