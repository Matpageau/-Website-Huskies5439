"use client"
import "./MediaGallery.css"
import Mansory from "react-masonry-css"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import FullscreenImage from './FullscreenImage/FullscreenImage'
import { animate } from 'animejs'

interface MediaGalleryProps {
  photos: string[],
  baseColumnCount?: number,
  columnCount_1000?: number,
  columnCount_750?: number
}

const MediaGallery: React.FC<MediaGalleryProps> = ({photos, baseColumnCount = 4, columnCount_1000 = 3, columnCount_750 = 1}) => {
  const [fullscreenPhoto, setFullscreenPhoto] = useState<string | null>(null)
  const [originRect, setOrigenRect] = useState<DOMRect | null>(null)
  
  const handleClick = (e: React.MouseEvent<HTMLImageElement>, photo: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setOrigenRect(rect)
    setFullscreenPhoto(photo)
  }

  const handleOnTouch = (e: React.MouseEvent<HTMLImageElement>, enter: boolean) => {
    const target = e.currentTarget

    animate(target, {
      scale: enter ? 1.06 : 1,
      duration: 200,
      ease: "inOutBack(1)"
    })
  }

  const closeFullscreen = () => {    
    setFullscreenPhoto(null)
    setOrigenRect(null)
  }

  useEffect(() => {

  }, [setFullscreenPhoto])

  const breakpointColumnsObj = {
    default: baseColumnCount,
    1000: columnCount_1000,
    750: columnCount_750,
  }

  return (
    <Mansory
      breakpointCols={breakpointColumnsObj}
      className="photo-gallery-container"
      columnClassName="gallery-column"
    >        
      {photos.map((photo, index) => (
        <Image
          key={index}
          className="galery-photo"
          onClick={(e) => handleClick(e, photo)}
          onMouseOver={(e) => handleOnTouch(e, true)}
          onMouseLeave={(e) => handleOnTouch(e, false)}
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
    </Mansory>
  )
}

export default MediaGallery