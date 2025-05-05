import "./SponsorBoard.css"
import React from 'react'

interface SponsorBoardProps {
  children: React.ReactNode
}

const sponsorBoard: React.FC<SponsorBoardProps> = ({ children }) => {
  return (
    <div className='sponsor_board'>
      {children}
    </div>
  )
}

export default sponsorBoard