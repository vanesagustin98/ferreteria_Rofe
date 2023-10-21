import s from "@/app/componentes/ProductList/ProductList.module.css";
import ss from "@/app/page.module.css";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { cartRemoveItem } from "@/app/redux/actions/actions";
import Link from "next/link";

function ProductListCart({
  id,
  name,
  image,
  description,
  price,
  qty,
  subTotal,
}) {
  const dispatch = useDispatch();
  const eliminarItemCarrito = (e) => {
    e.preventDefault();
    // Call the action in redux
    dispatch(cartRemoveItem(id));
  };
  return (
    <div className={s.all}>
      <div className={s.container}>
        <Image className={s.b}
          src="/ruta/imagen/95957.jpeg" // {image}
          alt="Foto descripción"
          width={100} // Define el ancho deseado
          height={100} // Define la altura deseada
        />
        <div className={s.b}>{name}</div>
        <div className={s.c}>{description}</div>
        <div className={s.d}>{price}</div>
        <div className={s.d}>{qty}</div>
        <div className={s.d}>{subTotal}</div>
        <div className={s.f}>
          <button className={s.button} onClick={(e) => eliminarItemCarrito(e)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductListCart;
