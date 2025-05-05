import Separator from "@/components/base/Separator/Separator";
import MediaGallery from "@/components/Medias/MediaGallery/MediaGallery";
import { getMentorsPhotos, getStudentsPhotos } from "@/Utils/galleries";

export default async function Equipe() {
  const mentorsPhotos = await getMentorsPhotos()
  const studentsPhotos = await getStudentsPhotos()
  
  return (
    <>
      <div className="presentation-container">
        <h1 className="page-title">Notre Équipe</h1>
      </div>
      <div className="content">
        <h1>Mentors</h1>
        <Separator/>
        <MediaGallery photos={mentorsPhotos} columnCount={5}></MediaGallery>
        <h1>Élèves</h1>
        <Separator/>
        <MediaGallery photos={studentsPhotos} columnCount={5}></MediaGallery>
      </div>
    </>
  );
}
