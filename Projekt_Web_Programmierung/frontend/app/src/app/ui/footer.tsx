import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <p>Email: info.test@prismarine-solutions.com</p>
        <p>Telefon: +49 01234 56789</p>
      </div>
      <div className={styles.links}>
        <Link href="https://instagram.com" className={styles.navlink}>
        <Image src="/instagram.ico" alt="Instagram Logo" layout="fixed" width={15} height={15}/>
        <span>     Instagram</span></Link>
        <Link href="https://x.com" className={styles.navlink}>
        <Image src="/twitter-alt.ico" alt="X Logo" layout="fixed" width={15} height={15}/>
        <span>     X</span></Link>
      </div>
      <div className={styles.links}>
        <Link href="/impressum" className={styles.navlink}>Impressum</Link>
        <Link href="/privacy" className={styles.navlink}>Datenschutz</Link>
      </div>
      <div className={styles.copyright}>
        <p>© 2024 Prismarine Solutions GmbH</p>
      </div>
    </footer>
  );
}