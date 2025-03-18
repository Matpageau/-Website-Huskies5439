import Image from "next/image";
import Link from 'next/link'
import style from './Navbar.module.css'

const navbar = () => {
  return (
    <nav className={style.navbar}>
      <Image className={style.topleft_logo} src="/images/huskies_logo.jpg" alt="Logo.jpg" width={85} height={85}></Image>
      <div className={style.navbar_btnContainer}>
        <div className={style.nav_btn}>
          <Link href={'/'}>Accueil</Link>
        </div>
        <div className={style.nav_btn}>
          <Link href={'/equipe'}>Équipe</Link>
        </div>
        <div className={style.nav_btn}>
          <Link href={'/saisons/2025'}>Nos saisons</Link>
        </div>
        <div className={style.nav_btn}>
          <Link href={'/medias'}>Médias</Link>
        </div>
        <div className={style.nav_btn}>
          <Link href={'/commenditaires'}>Nos commenditaires</Link>
        </div>
        <div className={style.nav_btn}>
          <Link href={'/nous_joindre'}>Nous joindre</Link>
        </div>
      </div>
    </nav>
  )
}

export default navbar