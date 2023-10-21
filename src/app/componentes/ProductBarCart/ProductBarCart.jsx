import React from "react";
import s from "@/app/componentes/ProductBar/ProductBar.module.css";

function ProductBarCart() {
  return (
    <div className={s.all}>
      <div className={s.container}>
        <div className={s.b}>Imagen</div>
        <div className={s.b}>Nombre</div>
        <div className={s.c}>Descripción</div>
        <div className={s.d}>Precio</div>
        <div className={s.d}>Cantidad</div>
        <div className={s.d}>Sub total</div>
        <div className={s.f}>Acción</div>
      </div>
    </div>
  );
}

export default ProductBarCart;
