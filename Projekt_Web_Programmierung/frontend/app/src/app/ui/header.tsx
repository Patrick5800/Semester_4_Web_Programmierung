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
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Image src="/favicon.ico" alt="Prismarine Solutions Logo" layout="fixed" width={50} height={50} />
          <span>Prismarine Solutions</span>
        </Link>
        <Link href="/customer/all" className={styles.navlink}>
          <button className={styles.headerButton}>Kunden</button>
        </Link>
        <Link href="/offer/all" className={styles.navlink}>
          <button className={styles.headerButton}>Angebote</button>
        </Link>
        <Link href="/tags" className={styles.navlink}>
          <button className={styles.headerButton}>Tags</button>
        </Link>
        <div className={styles.roleDropdown}>
          <select value={role} onChange={handleRoleChange} className={styles.dropdownOptions}>
            <option value="Account-Manager">Account-Manager</option>
            <option value="Developer">Entwickler</option>
            <option value="User">Benutzer</option>
          </select>
        </div>
      </nav>
    </header>
  );
}
