"use client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import style from "./page.module.css";
import { useState, useEffect } from "react";
import NavBar from "../componentes/NavBar/NavBar";
import BackButtom from "../componentes/BackButtom/BackButtom";
import ProductListCart from "../componentes/ProductListCart/ProductListCart";
import ProductBarCart from "../componentes/ProductBarCart/ProductBarCart";
import { postSale } from "../redux/actions/actions";
import { getUserByEmail } from "../redux/actions/actions";
import s from "./page.module.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

initMercadoPago("TEST-2704ea0d-a660-4fe8-be61-e2c32675c7ed");

function FormCarrito() {
  const dispatch = useDispatch();
  const allCartItems = useSelector((state) => state.allCartItems);
  const [paymentMethod, setPaymentMethod] = useState("");

  const user =
    typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;

  useEffect(() => {
    // Si el usuario no está presente y estás en un entorno de navegador
    if (!user && typeof window !== "undefined" && window.localStorage) {
      // Redirige al usuario a la página de inicio de sesión
      window.location.replace("/login");
    }
  }, [user]);

  const productSummary = [];
  const [preferenceId, setPreferenceId] = useState(null);
  const userActual = JSON.parse(user);

  allCartItems.forEach((item) => {
    const productName = item.Name;
    const quantity = item.Qty;
    const price = parseFloat(item.Price);
    // Buscar si el producto ya existe en el arreglo productSummary
    const existingProduct = productSummary.find(
      (summaryItem) => summaryItem.Name === productName
    );

    if (existingProduct) {
      existingProduct.Qty += quantity;
      existingProduct.Subtotal = existingProduct.Qty * price;
    } else {
      const Subtotal = quantity * price;
      productSummary.push({ ...item, Subtotal });
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (productSummary.length === 0) {
      alert(
        "Debe agregar al menos un producto al carrito para poder generar la compra"
      );
    } else {
      if (paymentMethod === "mercadoPago") {
        const dataToSend = {
          productSummary,
          paymentMethod,
        };
        dispatch(postSale(dataToSend)).then(async (data) => {
          if (typeof data.payload === "object") {
            console.log("Se registró la venta");
            console.log("Pagar con mercado pago");
            const subtotalsSum = productSummary.reduce(
              (total, item) => total + item.Subtotal,
              0
            );
            try {
              console.log("create");
              const response = await axios.post("/api/mercadoPago", {
                product: {
                  description: "Venta general",
                  price: subtotalsSum,
                  quantity: 1,
                  currency_id: "ARS",
                },
              });

              const { id } = response.data;
              console.log("sample");
              if (id) {
                setPreferenceId(id);
              }
            } catch (error) {
              console.error("Error al crear la preferencia:", error);
            }
          } else {
            alert(
              "Hubo un error al generar su compra, por favor inténtelo nuevamente."
            );
          }
        });
      } else {
        const dataToSend = {
          productSummary,
          paymentMethod,
        };
        dispatch(postSale(dataToSend)).then((data) => {
          if (typeof data.payload === "object") {
            try {
              axios.post("/api/nodemailer", {
                subject: "Confirmación de compra",
                toEmail: userActual.emailUser,
                productSummary,
                paymentMethod,
                isPurchase: true,
              });
              alert("Su compra se realizó exitósamente.");
              window.location.href = "/";
            } catch (error) {
              console.error(
                "No se pudo obtener el correo electrónico del usuario."
              );
            }
          }
        });
      }
    }
  };

  return (
    <div>
      <NavBar />
      <ProductBarCart />
      {productSummary.map(
        ({ ID, Image, Name, Description, Price, Qty, Subtotal }) => {
          return (
            <ProductListCart
              key={ID}
              id={ID}
              image={Image}
              name={Name}
              description={Description}
              price={Price}
              qty={Qty}
              subTotal={Subtotal}
            />
          );
        }
      )}
      <select
        name="paymentMethod"
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="efectivo">Efectivo</option>
        <option value="tarjeta">Tarjeta</option>
        <option value="mercadoPago">MercadoPago</option>
      </select>
      {preferenceId && (
        <div>
          <Wallet initialization={{ preferenceId }} className={s.wallet} />
        </div>
      )}
      <Link href="/">
        <BackButtom />
      </Link>
      <button className={style.add} onClick={(e) => onSubmit(e)}>
        $
      </button>
    </div>
  );
}

export default FormCarrito;
