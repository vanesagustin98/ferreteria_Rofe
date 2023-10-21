"use client";

import { useEffect, useState } from "react";
import { validate } from "@/app/componentes/validations.js/validationTags.js";
import NavBar from "../componentes/NavBar/NavBar";
import BackButtom from "../componentes/BackButtom/BackButtom";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  postTags,
  getRubro,
  getTags,
  deleteLogicRubro,
  deleteLogicTag,
} from "../redux/actions/actions";
import s from "@/app/postTag/postTag.module.css";

const ProveedorForm = () => {
  const [input, setInput] = useState({
    name: "",
    type: "group", // Establece el tipo predeterminado como 'group'
  });

  const dispatch = useDispatch();

  const allGroups = useSelector((state) => state.etiquetas);
  const allRubros = useSelector((state) => state.rubro);

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
    const validatepost = validate(input);

    if (Object.keys(validatepost).length !== 0) {
      alert("Llene los campos correctamente");
      setErrors(validatepost);
    } else {
      dispatch(postTags(input));
      console.log(input);
      setInput({
        name: "",
        type: "group", // Restablece el tipo a 'group' después del envío
      });
      alert(`Felicidades, el ${input.type} fue creado exitosamente.`);
    }
  }

  const handleDeleteRubro = (id) => {
    dispatch(deleteLogicRubro(id));
    dispatch(getRubro());
  };

  const handleDeleteTag = (id) => {
    dispatch(deleteLogicTag(id));
    dispatch(getTags());
  };

  useEffect(() => {
    dispatch(getRubro());
    dispatch(getTags());
  }, [dispatch, input]);
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
      <Link href="/suppliers">
        <BackButtom />
      </Link>
      <div className={s.divisor}>
        <div>
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.label}>
              <label htmlFor="nametag">Nombre de Rubro/Grupo:</label>
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
              <label htmlFor="type">Tipo:</label>
              <br />
              <select
                id="type"
                name="type"
                value={input.type}
                onChange={handleChange}
              >
                <option value="group">Grupo</option>
                <option value="rubro">Rubro</option>
              </select>
            </div>
            <button type="submit" className={s.b}>
              Enviar
            </button>
          </form>
        </div>
        <div className={s.rubroGrupo}>
          <div className={s.tabla}>
            <table border={1} className={s.table}>
              <thead>
                <tr>
                  <th>Rubro</th>
                </tr>
              </thead>
              <tbody>
                {allRubros
                  .filter((tag) => tag.isActive)
                  .map((rubro) => {
                    return (
                      <tr className={s.borde} key={rubro.id} value={rubro.name}>
                        <td>{rubro.name}</td>
                        <button
                          onClick={() => handleDeleteRubro(rubro.id)}
                          className={s.body}
                        >
                          X
                        </button>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className={s.tabla}>
            <table border={1} className={s.table}>
              <thead>
                <tr>
                  <th>Grupo</th>
                </tr>
              </thead>
              <tbody>
                {allGroups
                  .filter((tag) => tag.isActive)
                  .map((grupo) => {
                    return (
                      <tr className={s.borde} key={grupo.id} value={grupo.name}>
                        <td>{grupo.name}</td>
                        <button
                          onClick={() => handleDeleteTag(grupo.id)}
                          className={s.body}
                        >
                          X
                        </button>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedorForm;
