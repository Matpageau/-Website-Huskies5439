import "./FullscreenImage.css"
import Image from "next/image"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FullscreenImageProps {
  src: string
  onClose: () => void
}

const FullscreenImage: React.FC<FullscreenImageProps> = ({ src, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="fullscreen-modal"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Image
          src={src}
          height={2000}
          width={2000}
          alt="Image fullscreen"
          className="max-h-full max-w-full"
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default FullscreenImage