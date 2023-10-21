"use client";
import s from "@/app/componentes/ProductList/ProductList.module.css";
import ss from "@/app/page.module.css";
import Link from "next/link";
import {
  deleteLogicProduct,
  getAllProducts,
} from "@/app/redux/actions/actions";
import { useDispatch } from "react-redux";


function ProductList({ id, name, stock, costoActual, price, enlace }) {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user")
  const userActual = JSON.parse(user)

  const handleDelete = async (id) => {
    await dispatch(deleteLogicProduct(id));
    await dispatch(getAllProducts());
  };

  return (
    <div className={s.all}>
      <div className={s.container}>
        <div className={s.b}>{name}</div>
        <div className={s.c}>{stock}</div>
        <div className={s.d}>{costoActual}</div>
        <div className={s.e}>{costoActual * 1.21}</div>
        <div className={s.d}>{price}</div>
        <div className={s.f}>
          <Link className={ss.z} href={enlace}>
            <button className={s.button}>Detalle</button>
          </Link>
        </div>
        {userActual.rolUser !== "client" &&
          <div>
            <button onClick={() => handleDelete(id)} className={s.buttonEliminar}>Eliminar</button>
          </div>
        }
      </div>
    </div>
  );
}

export default ProductList;
