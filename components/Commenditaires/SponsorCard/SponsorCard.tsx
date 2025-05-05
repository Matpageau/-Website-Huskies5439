"use client"
import "./SponsorCard.css"
import React from 'react'
import Image from "next/image"

export interface ISponsorCard {
  sponsorName: string
  sponsorImage: string
  description: string
}

const SponsorCard: React.FC<ISponsorCard> = ({sponsorName, sponsorImage, description}) => {
  
  return (
    <div className="sponsor_card">
      <div className="sponsor-image-container">
        <Image className="sponsor-image" src={sponsorImage} alt={`${sponsorName} logo`} height={800} width={800} />
      </div>
      <div className="description_container">
        <p className="font26">{description}</p>
      </div>
    </div>
  )
}

export default SponsorCard