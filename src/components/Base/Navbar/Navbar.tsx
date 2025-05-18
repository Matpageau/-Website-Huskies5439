"use client"
import Image from "next/image";
import Link from 'next/link';
import './Navbar.css';
import { useEffect, useRef, useState } from "react";
import { AlignJustify } from "lucide-react";
import { usePathname } from "next/navigation";
import ToggleTheme from "../Theme/Toggle";

const Navbar = () => { 
  const [isOpen, setOpen] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null); // Reference for the hamburger button

  const pathname = usePathname();

  const menuLinks = [
    { href: "/", label: "Accueil" },
    { href: "/saisons/2025", label: "Nos saisons" },
    { href: "/equipe", label: "Équipe" },
    { href: "/medias/2025", label: "Médias" },
    { href: "/commenditaires", label: "Nos commenditaires" },
    { href: "/nous_joindre", label: "Nous joindre" },
  ];

  const handleClickOutside = (e: MouseEvent) => {
    if(buttonRef.current && !buttonRef.current.contains(e.target as Node) && isOpen) {
      setOpen(false);
    }
  };

  const handleLinkClick = () => {
    setNoTransition(true);
    setOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setNoTransition(false);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 1200 && isOpen) {
        setOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen])

  return (
    <>
      <nav className={`navbar ss-hidden flex-row`}>
        <Image className="topleft_logo" src="/images/huskies_logo.png" alt="Logo.jpg" width={60} height={60} />
        <div className="navbar_btnContainer_ls flex-row">
          {menuLinks.map((link) => {
            const isHome = link.href == "/"                     
            const isActive = isHome ? pathname == "/" : pathname.includes(`/${link.href.split("/")[1]}`);
            return (
              <Link key={link.href} className={`nav_btn semi-bold ${isActive ? "active" : ""}`} href={link.href}>
                {link.label}
              </Link>
            );
          })}
        </div>
        <ToggleTheme/>
      </nav>
      
      <nav className={`navbar ls-hidden ${isOpen ? "fixed" : ""}`}>
        <div className="hamburger" onClick={() => setOpen(!isOpen)} ref={buttonRef}>
          <AlignJustify height={30} width={30} />
        </div>
        <div className={`navbar_btnContainer_ss ${isOpen ? "visible fixed" : "hidden"} ${noTransition ? "no_transition" : ""}`}>
          {menuLinks.map((link) => (
            <div key={link.href} className="nav_btn flex-col semi-bold">
              <Link href={link.href} onClick={handleLinkClick}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;