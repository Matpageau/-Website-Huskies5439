import SeasonSelector from "@/components/saisons/SeasonSelector/SeasonSelector";
import "./medias.css"
import { getYearPhotos } from "@/Utils/galleries";
import MediaGallery from "@/components/Medias/MediaGallery/mediaGallery";

export default async function Medias({
  params,
}: { 
  params: Promise<{ year: string }>
}) {
  const { year } = await params;
  const photos = await getYearPhotos(year)
  
  
  return (
    <>
      <meta name="description" content="Photos Huskies 5439"/>
      <div className="presentation-container">
        <h1 className="page-title">Médias</h1>
      </div>
      <SeasonSelector year={year}></SeasonSelector>
      <div className="content">
        {photos.length > 0 ? 
          <MediaGallery photos={photos}></MediaGallery>
        :
          <h2 style={{justifySelf: "center", fontStyle: "italic"}}>Aucune photos pour l&apos;instant...</h2>
        }
      </div>
    </>
  );
}
