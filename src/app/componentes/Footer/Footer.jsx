import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/">Inicio</Link>
      <Link href="/dashAdmin">Panel</Link>
      <Link href="/suppliers">Proveedores</Link>
      <Link href="/users">Usuarios</Link>
    </footer>
  );
};

export default Footer;
