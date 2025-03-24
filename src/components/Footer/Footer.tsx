"use client"
import React, { useEffect, useState } from 'react'
import "./Footer.css"
import Toggle from '../Toggle/Toggle'

interface FooterProps {
  initialTheme: "light" | "dark";
}

const Footer = ({ initialTheme }: FooterProps) => {
  const [theme, setTheme] = useState(initialTheme);
  
  function toggleTheme() {   
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {    
    document.cookie = `theme=${theme}; path=/`;
    document.body.setAttribute("data-theme", theme);
  }, [theme])
  
  return (
    <footer className="footer">
      <Toggle handleChange={toggleTheme} isChecked={theme}/>
    </footer>
  )
}

export default Footer