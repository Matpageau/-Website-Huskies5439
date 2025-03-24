"use client"
import Image from "next/image";
import Link from 'next/link';
import style from './Navbar.module.css';
import { useEffect, useRef, useState } from "react";
import { AlignJustify } from "lucide-react";

const Navbar = () => { 
  const [isOpen, setOpen] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null); // Reference for the hamburger button

  const menuLinks = [
    { href: "/", label: "Accueil" },
    { href: "/equipe", label: "Équipe" },
    { href: "/saisons/2025", label: "Nos saisons" },
    { href: "/medias", label: "Médias" },
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

  return (
    <>
      <nav className={style.navbar}>
        <Image className={style.topleft_logo} src="/images/huskies_logo.jpg" alt="Logo.jpg" width={60} height={60} />
        <div className={style.hamburger} onClick={() => setOpen(!isOpen)} ref={buttonRef}>
          <AlignJustify height={30} width={30} />
        </div>
        <div className={style.navbar_btnContainer_ls}>
          {menuLinks.map((link) => (
            <div key={link.href} className={style.nav_btn}>
              <Link className="font26" href={link.href}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    
      <div className={`${style.navbar_btnContainer_ss} ${isOpen ? style.visible : style.hidden} ${noTransition ? style.no_transition : ""}`}>
        {menuLinks.map((link) => (
          <div key={link.href} className={style.nav_btn}>
            <Link className="font26" href={link.href} onClick={handleLinkClick}>
              {link.label}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;