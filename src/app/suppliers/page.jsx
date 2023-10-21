"use client";
import { useEffect } from "react";
import NavBar from "../componentes/NavBar/NavBar";
import SuppliersBar from "../componentes/SuppliersBar/SuppliersBar";
import SuppliersList from "../componentes/SuppliersList/SuppliersList";
import Link from "next/link";
import AddButtom from "../componentes/AddButtom/AddButtom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLogicSupplier, getSuppliers } from "../redux/actions/actions";
import style from "./page.module.css";

function Suppliers() {
  const dispatch = useDispatch();
  const allSuppliers = useSelector((state) => state.allSuppliers);

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch, allSuppliers]);

  const handleDelete = (id) => {
    dispatch(deleteLogicSupplier(id));
  };
  const user = typeof localStorage !== 'undefined' ? localStorage.getItem("user") : null;
  useEffect(() => {

    // Si el usuario no está presente y estás en un entorno de navegador
    if (!user && typeof window !== 'undefined' && window.localStorage) {
      // Redirige al usuario a la página de inicio de sesión
      window.location.replace("/login");
    }
  }, []);
  return (
    <div>
      <NavBar />
      <SuppliersBar />
      {allSuppliers.filter(supplier => supplier.isActive).map(
        ({ id_suppliers, name, cellphone, name_company, direction, email }) => {
          return (
            <div key={id_suppliers}>
              <SuppliersList
                name={name}
                name_company={name_company}
                direction={direction}
                cellphone={cellphone}
                email={email}
              />
              <button onClick={() => handleDelete(id_suppliers)} className={style.buttonEliminar}>Eliminar</button>
            </div>
          );
        }
      )}

      <Link href="/formProv">
        <AddButtom />
      </Link>
    </div>
  );
}

export default Suppliers;
