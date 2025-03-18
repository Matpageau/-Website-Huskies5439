import React from "react";
import style from "./YoutubeEmbed.module.css"

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <div className={style.video_container}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
