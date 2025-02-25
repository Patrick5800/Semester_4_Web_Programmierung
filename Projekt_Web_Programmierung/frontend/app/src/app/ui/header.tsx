"use client";

import { useState, useEffect } from "react";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [role, setRole] = useState("User");

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value;
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Image src="/logops.ico" alt="Prismarine Solutions Logo" width={32} height={32} />
        </Link>
        <Link href="/" className={styles.navlink}>Angebote</Link>
        <Link href="/customer" className={styles.navlink}>Kunden</Link>
        <Link href="/tags" className={styles.navlink}>Tags suchen</Link>
        <select value={role} onChange={handleRoleChange} className={styles.roleSelect}>
          <option value="Account-Manager">Account-Manager</option>
          <option value="Developer">Developer</option>
          <option value="User">User</option>
        </select>
      </nav>
    </header>
  );
}
