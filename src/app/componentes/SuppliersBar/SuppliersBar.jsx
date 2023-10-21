import React from "react";
import s from "@/app/componentes/SuppliersBar/SuppliersBar.module.css";

function SuppliersBar() {
  return (
    <div className={s.all}>
      <div className={s.container}>
        <div className={s.a}>Empresa</div>
        <div className={s.b}>Nombre</div>
        <div className={s.c}>Dirección</div>
        <div className={s.d}>E-Mail</div>
        <div className={s.e}>Telf.</div>
      </div>
    </div>
  );
}

export default SuppliersBar;
