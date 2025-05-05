import React from "react";
import "./YoutubeEmbed.css"

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <div className="video_container">
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
