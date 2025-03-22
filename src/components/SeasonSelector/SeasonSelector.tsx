"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import style from "./SeasonSelector.module.css"

interface SeasonSelectorProps {
  year: string;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({ year }) => {
  const [season, setSeason] = useState(year)
  const router = useRouter()

  useEffect(() => {
    if(season !== year) {
      router.push(`/saisons/${season}`)
    }
  }, [season, year, router])
  
  return (
    <select className={`font20 ${style.seasonSelector}`} id="seasonSelector" onChange={(e) => setSeason(e.target.value)} value={season}>
      <option value="2025">Saison 2025</option>
      <option value="2024">Saison 2024</option>
      <option value="2023">Saison 2023</option>
      <option value="2022">Saison 2022</option>
      <option value="2021">Saison 2021</option>
      <option value="2020">Saison 2020</option>
      <option value="2019">Saison 2019</option>
      <option value="2018">Saison 2018</option>
      <option value="2017">Saison 2017</option>
      <option value="2016">Saison 2016</option>
      <option value="2015">Saison 2015</option>
    </select>
  )
}

export default SeasonSelector