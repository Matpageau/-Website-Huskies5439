"use client"
import "./mediaGallery.css"
import Mansory from "react-masonry-css"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import FullscreenImage from './FullscreenImage/fullscreenImage'
import { animate } from 'animejs'

interface MediaGalleryProps {
  photos: string[],
  columnCount?: number
}

const MediaGallery: React.FC<MediaGalleryProps> = ({photos, columnCount = 3}) => {
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
    default: columnCount,
    1000: columnCount - 1,
    750: columnCount - 2,
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