// app/saisons/[year]/loading.tsx
import React from "react"

export default function Loading() {
  return (
    <div className="presentation_container">
      <h1 className="Loading-text">Chargement des données...</h1>
      <div className="spinner"></div>
    </div>
  )
}