"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./page.module.css";
import Link from "next/link";
import NavBar from "../componentes/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, cartAddItem } from "../redux/actions/actions";

const Detail = ({ params }) => {
  const id = params.id;
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.allCartItems);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );

  const productDetail = useSelector((state) => state.productDetail);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const onSubmit = async (event) => {
    event.preventDefault();
    let addProdToCart = {};
    addProdToCart.ID = id;
    addProdToCart.Image = productDetail.image;
    addProdToCart.Name = productDetail.name;
    addProdToCart.Description = productDetail.descripcion;
    addProdToCart.Price = productDetail.price;
    addProdToCart.Qty = 1;

    dispatch(cartAddItem(addProdToCart));
    let errorValidate = false;
    cartItems.map((item) => {
      if (item.error !== undefined) {
        errorValidate = true;
      }
    });

    if (errorValidate) {
      alert("No hay stock suficiente para agregar este producto a su carrito.");
    } else {
      alert("¡Producto agregado exisósamente al carrito!");
    }
  };

  return (
    <>
      <NavBar />
      <main className={style.main}>
        <section className={style.section}>
          <div className={style.divImg}>
            {productDetail.image ? (
              <Image
                src={productDetail.image}
                alt="Mi Imagen"
                width={600} // Define el ancho deseado
                height={400} // Define la altura deseada
              />
            ) : (
              <Image
                src="/ruta/a/martillo.jpg"
                alt="Foto Descripción"
                width={600} // Define el ancho deseado
                height={400} // Define la altura deseada
              />
            )}
          </div>
          <div className={style.divDescription}>
            {productDetail ? (
              <>
                <h1 key={productDetail.id}>{productDetail.name}</h1>
                <div className={style.description}>
                  <h2>Descripcion:</h2>
                  <p>{productDetail.descripcion}</p>
                </div>
                <div className={style.seguido}>
                  <h2>Grupo:</h2>
                  <p>{productDetail.rubro}</p>
                </div>
                <div className={style.seguido}>
                  <h2>Rubro:</h2>
                  <p>{productDetail.group}</p>
                </div>
                <div className={style.seguido}>
                  <h2>Proveedor:</h2>
                  <p>{productDetail.supplierName}</p>
                </div>
                <div className={style.seguido}>
                  <h2>Precio anterior:</h2>
                  <p>{productDetail.costoAnterior}</p>
                </div>
                <div className={style.seguido}>
                  <h2>Stock:</h2>
                  <p>{productDetail.stock}</p>
                </div>
                <div className={style.seguido}>
                  <h2>Precio:</h2>
                  <p>{productDetail.price}</p>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </section>

        <Link key={id} props={productDetail} href={`/updateProd/${id}`}>
          <button>Modificar</button>
        </Link>
        <Link href="/">
          <button className={style.button}>Volver</button>
        </Link>

        <button
          className={style.buttonAgg}
          onClick={(event) => {
            onSubmit(event);
          }}
        >
          Agregar al Carrito
        </button>
      </main>
    </>
  );
};

export default Detail;
