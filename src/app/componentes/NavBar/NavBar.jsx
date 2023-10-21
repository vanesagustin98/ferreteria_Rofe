import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiMoon } from "react-icons/fi";
import { BsSun } from "react-icons/bs";
import s from "@/app/componentes/NavBar/NavBar.module.css";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import Dashboard from "@/app/dashAdmin/page";

import {
  filterByProd,
  filterBySuppliers,
  getAllProducts,
  getSuppliers,
  getTags,
  orderBy,
} from "@/app/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const tag = useSelector((state) => state.etiquetas);
  const suppliers = useSelector((state) => state.suppliers);

  // Si el usuario no está presente y estás en un entorno de navegador
  const user = typeof localStorage !== 'undefined' ? localStorage.getItem("user") : null;
  useEffect(() => {

    // Si el usuario no está presente y estás en un entorno de navegador
    if (!user && typeof window !== 'undefined' && window.localStorage) {
      // Redirige al usuario a la página de inicio de sesión
      window.location.replace("/login");
    }
  }, []);
  const userActual = JSON.parse(user);

  useEffect(() => {
    dispatch(getSuppliers()),
      dispatch(getTags());
  }, [dispatch]);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  function handleSort(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllProducts());
    } else {
      dispatch(orderBy(e.target.value));
    }
  }

  function handleFilter(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllProducts());
    } else {
      dispatch(filterByProd(e.target.value));
    }
  }

  function handleFilter1(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllProducts());
    } else {
      dispatch(filterBySuppliers(e.target.value));
    }
  }

  return (
    <div className={s.container}>
      <Link href="/">
        <div className={s.logo}></div>
      </Link>

      <div>
        <div className={s.search}>
          <SearchBar />
        </div>
        <div className={s.botones}>
          <div className={s.option}>
            <select onChange={(e) => handleSort(e)}>
              <option value="all">Ordenar</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="MenorPrecio">Precio Asc.</option>
              <option value="MayorPrecio">Precio desc.</option>
            </select>
          </div>
          <div className={s.option}>
            <select onChange={(e) => handleFilter(e)}>
              <option value="">Grupo</option>
              {tag &&
                tag.map((p) => {
                  return (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={s.option2}>
            <select onChange={(e) => handleFilter1(e)}>
              <option value="">Proveedor</option>
              {suppliers &&
                suppliers.map((s) => {
                  return (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {userActual.rolUser !== "client" &&
            <div className={s.rutas}>
              <Link href="/history">Historial</Link>
            </div>
          }
          {userActual.rolUser !== "client" &&
            <div className={s.rutas}>
              <Link href="/suppliers">Proveedores</Link>
            </div>
          }
        </div>
      </div>
      <div className={s.sesion}>
        <div>
          {theme === "dark" ? (
            <BsSun
              size={30}
              cursor="pointer"
              onClick={() => setTheme("light")}
            />
          ) : (
            <FiMoon
              size={30}
              cursor="pointer"
              onClick={() => setTheme("dark")}
            />
          )}
        </div>
        {userActual.rolUser === "admin" &&
          <div className={s.dash}>
            <Link href="/dashAdmin">Ir al Panel</Link>
          </div>
        }
        <div className={s.login}>
          <Link href="/login" onClick={handleLogout}>Cerrar Sesion</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
