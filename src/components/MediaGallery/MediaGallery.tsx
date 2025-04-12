"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import FullscreenImage from './FullscreenImage/FullscreenImage'

interface MediaGalleryProps {
  photos: string[]
}

const MediaGallery: React.FC<MediaGalleryProps> = ({photos}) => {
  const [fullscreenPhoto, setFullscreenPhoto] = useState<string | null>(null)

  const handleClick = (photo: string) => {
    setFullscreenPhoto(photo)
  }

  const closeFullscreen = () => {
    setFullscreenPhoto(null)
  }

  return (
    <>
      {photos.map((photo, index) => (
        <Image
          key={index}
          className="galery-photo"
          onClick={() => handleClick(photo)}
          src={photo}
          alt={`Photo ${index}`}
          width={500}
          height={500}
          ></Image>
      ))}

      {fullscreenPhoto && (
        <FullscreenImage src={fullscreenPhoto} onClose={closeFullscreen}/>
      )}
    </>
  )
}

export default MediaGallery