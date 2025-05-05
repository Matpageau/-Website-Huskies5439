import "./fullscreenImage.css"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { animate } from "animejs"

interface FullscreenImageProps {
  src: string
  onClose: () => void
  originRect: DOMRect | null
}

const FullscreenImage: React.FC<FullscreenImageProps> = ({ src, onClose, originRect }) => {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  
  const handleClose = useCallback(() => {
    if(isClosing || !imageRef.current || !modalRef.current || !originRect) return
    setIsClosing(true)

    const originLeftPercentage = (originRect.left / window.innerWidth) * 100
    const originTopPercentage = (originRect.top / window.innerHeight) * 100
    const originWidthPercentage = (originRect.width / window.innerWidth) * 100
    const originHeightPercentage = (originRect.height / window.innerHeight) * 100

    animate(imageRef.current, {
      left: `${originLeftPercentage}%`,
      top: `${originTopPercentage}%`,
      width: `${originWidthPercentage}%`,
      height: `${originHeightPercentage}%`,
      duration: 300,
      onComplete: () => {
        onClose()
      }
    })

    animate(modalRef.current, {
      opacity: ["1", "0"],
      duration: 200
    })
  }, [originRect, isClosing, onClose])
  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleClose])

  useEffect(() => {    
    if(imageRef.current && modalRef.current && originRect && loaded) {
      
      const originLeftPercentage = (originRect.left / window.innerWidth) * 100
      const originTopPercentage = (originRect.top / window.innerHeight) * 100
      const originWidthPercentage = (originRect.width / window.innerWidth) * 100
      const originHeightPercentage = (originRect.height / window.innerHeight) * 100

      let finalWidthPercentage = 80
      let finalHeightPercentage = originHeightPercentage * (finalWidthPercentage / originWidthPercentage)
      
      if (finalHeightPercentage > 75) {
        finalHeightPercentage = 75
        finalWidthPercentage = originWidthPercentage * (finalHeightPercentage / originHeightPercentage)
      }
      
      const finalLeftPercentage = (100 - finalWidthPercentage) / 2
      const finalTopPercentage = (100 - finalHeightPercentage) / 2

      animate(imageRef.current, {
        left: [`${originLeftPercentage}%`, `${finalLeftPercentage}%`],
        top: [`${originTopPercentage}%`, `${finalTopPercentage}%`],
        width: [`${originWidthPercentage}%`, `${finalWidthPercentage}%`],
        height: [`${originHeightPercentage}%`, `${finalHeightPercentage}%`],
        ease: "inOutBack(1)",
        duration: 300
      })
      

      animate(modalRef.current, {
        opacity: ["0" , "1"],
        duration: 200
      })
    }
  }, [loaded, originRect])

  return (
    <div
      className="fullscreen-modal"
      onClick={handleClose}
      ref={modalRef}
      >
      <Image
        ref={imageRef}
        src={src}
        height={2000}
        width={2000}
        alt="Image fullscreen"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default FullscreenImage