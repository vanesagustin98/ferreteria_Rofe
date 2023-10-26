"use client";
import Link from "next/link";
import style from "./dashboard.module.css";
import NavBar from "../componentes/NavBar/NavBar";
import LinesChart from "./graficos/LinesChart";
import BarsChart from "./graficos/BarsChart";
import PiesChart from "./graficos/PiesChart";
import { useEffect} from "react";

const Dashboard = () => {

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
      <div className={style.containerGrid}>
        <div className={style.caja1}>
          <div className={style.infoAdmin}>
            <img
              className={style.image}
              src="https://comercialsanjose.com.ar/wp-content/uploads/2021/11/FERRETERIA.png"
              alt="Avatar"
            />
            <ul className={style.ul}>
              <li className={style.li}>ADMIN</li>
              <li className={style.li}>rofeferreteria@gmail.com</li>
              <li className={style.li}>2165295375</li>
            </ul>
          </div>
          <div className={style.cajaButtons1}>
            
            <Link href="/formProv" className={style.buttonsCaja1}>
              Crear Proveedor
            </Link>
            <Link href="/register" className={style.buttonsCaja1}>
              Manejo de Usuarios
            </Link>
            <Link href="/postTag" className={style.buttonsCaja1}>
              Crear Rubro/Grupo
            </Link>
            <Link href="/formProducto" className={style.buttonsCaja1}>
              Crear Producto
            </Link>
            <Link href="/" className={style.buttonsCaja1}>
              Volver al inicio
            </Link>
          </div>
        </div>
        <div className={style.caja2}>
          <div className={style.cajaButtons2}></div>
          <div className={style.cajaGraficos}>
            <div className={style.grafico}>
              <LinesChart />
            </div>
            <div className={style.grafico}>
              <PiesChart />
            </div>
            <div className={style.graficoGrande}>
              <BarsChart />
            </div>
            {/* <div className={style.grafico}>
              <h3>Personal</h3>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
