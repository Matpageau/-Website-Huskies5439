import SeasonSelector from "@/components/SeasonSelector/SeasonSelector";
import Image from "next/image";
import "./medias.css"
import { getYearPhotos } from "@/Utils/yearGallery";

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
        <div className="photo-gallery-container">
          {photos.map((photo, index) => (
            <Image className="galery-photo" key={index} src={photo} alt={`Photo ${index}`} width={500} height={500}></Image>
          ))}
        </div>
      </div>
    </>
  );
}
