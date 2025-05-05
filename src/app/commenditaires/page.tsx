import "./sponsors.css"
import SponsorBoard from "../../components/Commenditaires/SponsorBoard/SponsorBoard";
import SponsorCard from "../../components/Commenditaires/SponsorCard/SponsorCard";

export default async function Sponsors() {  
  return (
    <>
      <meta name="description" content="Photos Huskies 5439"/>
      <div className="presentation-container">
        <h1 className="page-title">Nos Commenditaires</h1>
      </div>
      <div className="content">
          <SponsorBoard>
            <SponsorCard sponsorName="Festo" description="FESTO est une entreprise alemande qui produit nos pièces de métal. Festo est une entreprise alemande qui produit nos pièces de métal." sponsorImage="/images/sponsors/festo.png"/>
            <SponsorCard sponsorName="Polyvalente de Charlesbourg" description="La polyvalente de Charlesbourg est l'école dans laquelle nous nous situons." sponsorImage="/images/sponsors/polyCh.png"/>
          </SponsorBoard>
          <SponsorBoard>
            <SponsorCard sponsorName="Centre de service scolaire des Premières-Seigneuries" description="" sponsorImage="/images/sponsors/csdps.png"/>
            <SponsorCard sponsorName="Argosy Foundation" description="" sponsorImage="/images/sponsors/argosy.png"/>
            <SponsorCard sponsorName="Connexion Technique Inc." description="" sponsorImage="/images/sponsors/connexion.png"/>
          </SponsorBoard>
          <SponsorBoard>
            <SponsorCard sponsorName="Batteries du québec" description="Cette compagnie nous prête 10 batteries pour nos compétitons." sponsorImage="/images/sponsors/batteries.png"/>
            <SponsorCard sponsorName="Applied Industrial Technologie" description="Cette compagnie nous fournis en matériel plastique." sponsorImage="/images/sponsors/applied.png"/>
            <SponsorCard sponsorName="Député de Charlesbourg, M. Julien" description="Le député de Charlesbourg, M. Julien nous offre son soutien." sponsorImage="/images/sponsors/depute.png"/>
            <SponsorCard sponsorName="PolyAlto" description="" sponsorImage="/images/sponsors/polyalto.png"/>
          </SponsorBoard>
      </div>
    </>
  );
}
