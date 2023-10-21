"use client";
import React, { useEffect, useState } from "react";
import validate from "@/app/componentes/validations.js/validateProductos";
import NavBar from "../../componentes/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";

import {
  getProductById,
  getRubro,
  getSuppliers,
  getTags,
  updateProducts,
} from "../../redux/actions/actions";
import { CldUploadButton } from "next-cloudinary";
import s from "@/app/formProducto/page.module.css";


function FormProducto({ params }) {

  let id = params.id

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const grupos = useSelector((state) => state.etiquetas);
  const suppliers = useSelector((state) => state.allSuppliers);
  const rubros = useSelector((state) => state.rubro);
  const Prod = useSelector((state) => state.productDetail);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const [input, setInput] = useState({
    id: id,
    name: Prod.name,
    image: Prod.image,
    imageID: Prod.imageID,
    descripcion: Prod.descripcion,
    costoAnterior: Prod.costoAnterior,
    costoActual: Prod.costoActual,
    price: Prod.price,
    stock: Prod.stock,
    isActive: true,
    group: Prod.group,
    rubro: Prod.rubro,
    supplierName: Prod.supplierName
  });

  const [image, setImage] = useState({
    image: "",
    imageID: "",
  });
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
      console.log(input)
      dispatch(updateProducts(input));
      alert("El producto fue modificado con éxito.");
    }

  }
  const handleUploadSuccess = (e) => {
    const { public_id, url } = e.info;
    console.log(public_id, url);
    setImage({
      image: url,
      imageID: public_id,
    });
  };
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
  const user = localStorage.getItem("user")
  if (!user) {
    window.location.replace("/login");
  }
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
              {grupos.map((g) => {
                return (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                );
              })}
            </select>

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
              {rubros.map((r) => {
                return (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                );
              })}
            </select>

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
              {suppliers.map((s) => {
                return (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                );
              })}
            </select>
            {errors.supplierName && (
              <p className={s.errorSelect}>{errors.supplierName}</p>
            )}
          </div>
        </div>
        <div className={s.butt}>
          <CldUploadButton
            uploadPreset="uv0vtybv"
            onSuccess={handleUploadSuccess}
          >
            Seleccionar imagen
          </CldUploadButton>
          <button type="submit" className={s.b}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormProducto;
