import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../app/componentes/Layout";


export default function Registro() {
  const router = useRouter();

  const [detalleVenta, setDetalleVenta] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [total, setTotal] = useState("");

  const guardarVenta = async () => {
    if (!producto || !cantidad || !total || !detalleVenta) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const nuevaVenta = {
      producto,
      cantidad,
      total,
      detalleVenta,
    };

    try {
      const response = await fetch("/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaVenta),
      });

      if (response.ok) {
        alert("Venta registrada exitosamente.");
        router.push("/");
      } else {
        alert("Error al registrar la venta.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <Layout>
      <h1>Registrar Venta</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Producto:</label>
          <input
            type="text"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <div>
          <label>Detalle de la Venta:</label>
          <textarea
            value={detalleVenta}
            onChange={(e) => setDetalleVenta(e.target.value)}
          />
        </div>
        <div>
          <label>Total:</label>
          <input
            type="number"
            step="0.01"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
        <button type="submit">Registrar Venta</button>
        <button type="button" onClick={guardarVenta}>
          Guardar Venta
        </button>
      </form>
    </Layout>
  );
}
