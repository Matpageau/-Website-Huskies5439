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
      <div className="presentation-container">
        <h1 className="page-title">Médias</h1>
      </div>
      <SeasonSelector year={year}></SeasonSelector>
      <div className="content">
        <div className="photo-gallery-container">
          {photos.map((photo, index) => (
            <Image className="galery-photo" key={index} src={photo} alt={`Photo ${index}`} width={1000} height={1000}></Image>
          ))}
        </div>
      </div>
    </>
  );
}
