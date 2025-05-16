import Separator from "../../components/Base/Separator/Separator";
import MediaGallery from "../../components/Medias/MediaGallery/MediaGallery";
import { getMentorsPhotos, getStudentsPhotos } from "@/Utils/galleries";

export default async function Equipe() {
  const mentorsPhotos = await getMentorsPhotos()
  const studentsPhotos = await getStudentsPhotos()
  
  return (
    <>
      <meta name="description" content="Équipe Huskies 5439"/>
      <div className="presentation-container">
        <h1 className="page-title">Notre Équipe</h1>
      </div>
      <div className="content">
        <h1 className="font-large">Mentors</h1>
        <Separator/>
        <MediaGallery photos={mentorsPhotos} baseColumnCount={5} columnCount_1000={3} columnCount_750={2}></MediaGallery>
        <h1 className="font-large">Élèves</h1>
        <Separator/>
        <MediaGallery photos={studentsPhotos} baseColumnCount={5} columnCount_1000={3} columnCount_750={2}></MediaGallery>
      </div>
    </>
  );
}
