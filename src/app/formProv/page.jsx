"use client";
import { useState, useEffect } from "react";
import { validateProveedor } from "../componentes/validations.js/ValidationProveedores";
import NavBar from "../componentes/NavBar/NavBar";
import BackButtom from "../componentes/BackButtom/BackButtom";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { postSuppliers } from "../redux/actions/actions";
import s from "@/app/formProv/FormProv.module.css";

const ProveedorForm = () => {
  const [input, setInput] = useState({
    name_company: "",
    name: "",
    direction: "",
    email: "",
    cellphone: "",
    isActive: true,
  });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: undefined,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validate = validateProveedor(input);

    if (Object.keys(validate).length !== 0) {
      alert("Llene los campos correctamente");
      setErrors(validate);
    } else {
      dispatch(postSuppliers(input));
      console.log(input);
      setInput({
        name_company: "",
        name: "",
        direction: "",
        email: "",
        cellphone: "",
        isActive: true,
      });
      alert("Felicidades, el proveedor fue creado exitosamente.");
    }
  }
  const user = typeof localStorage !== 'undefined' ? localStorage.getItem("user") : null;
  useEffect(() => {

    // Si el usuario no está presente y estás en un entorno de navegador
    if (!user && typeof window !== 'undefined' && window.localStorage) {
      // Redirige al usuario a la página de inicio de sesión
      window.location.replace("/login");
    }
  }, []);
  return (
    <>
      <a>
        <NavBar />
        <Link href="/suppliers">
          <BackButtom />
        </Link>
        <form onSubmit={handleSubmit} className={s.form}>
          <h1 style={{ textAlign: "center" }}>Proveedor</h1>
          <div className={s.label}>
            <label htmlFor="name_company">Empresa:</label>
            <br />
            <input
              className={s.input}
              type="text"
              id="name_company"
              name="name_company"
              value={input.name_company}
              onChange={handleChange}
            />
            {errors.name_company && (
              <p className={s.error}>{errors.name_company}</p>
            )}
            <br />
          </div>

          <div className={s.label}>
            <label htmlFor="name">Nombre:</label>
            <br />
            <input
              className={s.input}
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            <br />
            {errors.name && <p className={s.error}>{errors.name}</p>}
          </div>

          <div className={s.label}>
            <label htmlFor="direction">dirección:</label>
            <br />
            <input
              className={s.input}
              type="text"
              id="direction"
              name="direction"
              value={input.direction}
              onChange={handleChange}
            />
            <br />
            {errors.direction && <p className={s.error}>{errors.direction}</p>}
          </div>

          <div className={s.label}>
            <label htmlFor="email">E-Mail:</label>
            <br />
            <input
              className={s.input}
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
            <br />
            {errors.email && <p className={s.error}>{errors.email}</p>}
          </div>

          <div className={s.label}>
            <label htmlFor="cellphone">Telefono:</label>
            <br />
            <input
              className={s.input}
              type="number"
              id="cellphone"
              name="cellphone"
              value={input.cellphone}
              onChange={handleChange}
            />
            <br />
            {errors.cellphone && <p className={s.error}>{errors.cellphone}</p>}
          </div>
          <div className={s.butt}>
            <button type="submit" className={s.b}>
              Enviar
            </button>
          </div>
        </form>
      </a>
    </>
  );
};

export default ProveedorForm;
