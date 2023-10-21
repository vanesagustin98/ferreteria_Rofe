"use client";
import React, { useEffect, useState } from "react";
import validate from "../componentes/validations.js/validateProductos";
import NavBar from "../componentes/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getRubro,
  getSuppliers,
  getTags,
  postProducts,
} from "../redux/actions/actions";
import { CldUploadButton } from "next-cloudinary";
import s from "@/app/formProducto/page.module.css";
function FormProducto() {
  const [input, setInput] = useState({
    name: "",
    descripcion: "",
    costoAnterior: "",
    costoActual: "",
    group: [],
    rubro: [],
    supplierName: [],
    price: "",
    stock: "",
  });
  const [image, setImage] = useState({
    image: "",
    imageID: "",
  });
  const handleUploadSuccess = (e) => {
    if (e.event === "success") {
      const { public_id, url } = e.info;
      console.log(public_id, url);
      setImage({
        image: url,
        imageID: public_id,
      });

    }
  };

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const group = useSelector((state) => state.etiquetas);
  const suppliers = useSelector((state) => state.allSuppliers);
  const rubro = useSelector((state) => state.rubro);

  useEffect(() => {
    dispatch(getTags());
    dispatch(getRubro());
    dispatch(getSuppliers());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(input);

    if (
      Object.keys(validationErrors).length !== 0 ||
      !input.group.length ||
      !input.rubro.length ||
      !input.supplierName.length
    ) {
      alert("Llene los campos correctamente");
      setErrors(validationErrors);
    } else {
      input.image = image.image;
      input.imageID = image.imageID;
      dispatch(postProducts(input));
      setInput({
        name: "",
        descripcion: "",
        costoAnterior: "",
        costoActual: "",
        isActive: true,
        group: [],
        rubro: [],
        supplierName: [],
        price: "",
        stock: "",
      });
      alert("Felicidades, el producto fue creado exitosamente.");
    }
  }

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

  function handleTags(e) {
    const tagValue = e.target.value;
    if (!input.group.includes(tagValue)) {
      setInput((prevInput) => ({
        ...prevInput,
        group: [...prevInput.group, tagValue],
      }));
    }
  }

  function handleRubro(e) {
    const RubroValue = e.target.value;
    if (!input.rubro.includes(RubroValue)) {
      setInput((prevInput) => ({
        ...prevInput,
        rubro: [...prevInput.rubro, RubroValue],
      }));
    }
  }

  function handleSuppliers(e) {
    const supplierValue = e.target.value;
    if (!input.supplierName.includes(supplierValue)) {
      setInput((prevInput) => ({
        ...prevInput,
        supplierName: [...prevInput.supplierName, supplierValue],
      }));
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
    <div>
      <NavBar />
      <form onSubmit={handleSubmit} className={s.form}>
        <h1 style={{ textAlign: "center" }}>Productos</h1>
        <div className={s.label}>
          <label htmlFor="name">Nombre:</label>
          <input
            className={s.input}
            type="text"
            id="name"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          {errors.name && <p className={s.error}>{errors.name}</p>}
        </div>

        <div className={s.label}>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            className={s.input}
            id="descripcion"
            name="descripcion"
            value={input.descripcion}
            onChange={handleChange}
          />
          {errors.descripcion && (
            <p className={s.error}>{errors.descripcion}</p>
          )}
        </div>

        <div className={s.label}>
          <label htmlFor="costoAnterior">Costo Anterior:</label>
          <input
            className={s.input}
            type="number"
            id="costoAnterior"
            name="costoAnterior"
            value={input.costoAnterior}
            onChange={handleChange}
          />
          {errors.costoAnterior && (
            <p className={s.error}>{errors.costoAnterior}</p>
          )}
        </div>

        <div className={s.label}>
          <label htmlFor="costoActual">Costo Actual:</label>
          <input
            className={s.input}
            type="number"
            id="costoActual"
            name="costoActual"
            value={input.costoActual}
            onChange={handleChange}
          />
          {errors.costoActual && (
            <p className={s.error}>{errors.costoActual}</p>
          )}
        </div>

        <div className={s.label}>
          <label htmlFor="price">% Ganancia:</label>
          <input
            className={s.input}
            type="number"
            id="price"
            name="price"
            value={input.price}
            onChange={handleChange}
          />
          {errors.price && <p className={s.error}>{errors.price}</p>}
        </div>

        <div className={s.label}>
          <label htmlFor="stock">Stock:</label>
          <input
            className={s.input}
            type="number"
            id="stock"
            name="stock"
            value={input.stock}
            onChange={handleChange}
          />
          {errors.stock && <p className={s.error}>{errors.stock}</p>}
        </div>
        <div className={s.agregarImg}>
          <h3>Agregar una imagen</h3>
          <CldUploadButton
            uploadPreset="uv0vtybv"
            onSuccess={handleUploadSuccess}
          >
            Seleccionar imagen
          </CldUploadButton>
        </div>
        <div className={s.rubroGrupo}>
          <div>
            <select
              id="grupo"
              defaultValue=""
              className={s.option}
              onChange={(e) => handleTags(e)}
            >
              <option value="" disabled hidden>
                Grupo
              </option>
              {group.filter(product => product.isActive).map((g) => {
                return (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                );
              })}
            </select>

            {/* {input.group.map((g) => (
              <div className={s.optioncombinada}>
                <div className={s.selectioned}>{g}</div>

                <span
                  onClick={() => handleDeleteG(g)}
                  key={g}
                  value={g}
                  className={s.x}
                >
                  X
                </span>
              </div>
            ))} */}
            <br />
            {errors.group && <p className={s.errorSelect}>{errors.group}</p>}
          </div>

          <div>
            <select
              id="rubro"
              defaultValue=""
              className={s.option}
              onChange={(e) => handleRubro(e)}
            >
              <option value="" disabled hidden>
                Rubro
              </option>
              {rubro.filter(product => product.isActive).map((r) => {
                return (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                );
              })}
            </select>
            {/* {input.rubro.map((r) => (
              <div className={s.optioncombinada}>
                <div className={s.selectioned}>{r}</div>

                <span
                  onClick={() => handleDeleteG(r)}
                  key={r}
                  value={r}
                  className={s.x}
                >
                  X
                </span>
              </div>
            ))} */}
            {errors.rubro && <p className={s.errorSelect}>{errors.rubro}</p>}
          </div>
        </div>
        <div className={s.label1}>
          <div>
            <select
              id=""
              defaultValue=""
              className={s.option}
              onChange={(e) => handleSuppliers(e)}
            >
              <option value="" disabled hidden>
                Proveedor
              </option>
              {suppliers.filter(product => product.isActive).map((s) => {
                return (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                );
              })}
            </select>
            {/* {input.supplierName.map((s) => (
            <div className={s.optioncombinada}>
              <div className={s.selectioned}>{s}</div>
              <span
                onClick={() => handleDeleteS(s)}
                key={s}
                value={s}
                className={s.x}
              >
                X
              </span>
            </div>
          ))} */}
            {errors.supplierName && (
              <p className={s.errorSelect}>{errors.supplierName}</p>
            )}
          </div>
        </div>
        <div className={s.butt}>
          <button type="submit" className={s.b}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormProducto;
