"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import FullscreenImage from './FullscreenImage/FullscreenImage'

interface MediaGalleryProps {
  photos: string[]
}

const MediaGallery: React.FC<MediaGalleryProps> = ({photos}) => {
  const [fullscreenPhoto, setFullscreenPhoto] = useState<string | null>(null)
  const [originRect, setOrigenRect] = useState<DOMRect | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLImageElement>, photo: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setOrigenRect(rect)
    setFullscreenPhoto(photo)
  }

  const closeFullscreen = () => {    
    setFullscreenPhoto(null)
    setOrigenRect(null)
  }

  useEffect(() => {

  }, [setFullscreenPhoto])

  return (
    <>
      {photos.map((photo, index) => (
        <Image
          key={index}
          className="galery-photo"
          onClick={(e) => handleClick(e, photo)}
          src={photo}
          alt={`Photo ${index}`}
          width={500}
          height={500}
          ></Image>
      ))}

      {fullscreenPhoto && (
        <FullscreenImage 
          src={fullscreenPhoto}
          onClose={closeFullscreen}
          originRect={originRect}
        />
      )}
    </>
  )
}

export default MediaGallery