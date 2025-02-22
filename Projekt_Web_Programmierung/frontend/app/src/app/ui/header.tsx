import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navlink}>Home</Link>
        <Link href="/customer" className={styles.navlink}>Kunden</Link>
        <Link href="/offer" className={styles.navlink}>Angebote</Link>
      </nav>
    </header>
  );
}
