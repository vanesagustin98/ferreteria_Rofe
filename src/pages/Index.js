import Link from "next/link";
import Layout from "../app/componentes/Layout";
import ventasData from "../app/data/ventas.json";

export default function Home() {
  return (
    <Layout>
      <h1>Registro de Ventas</h1>
      <ul>
        {ventasData.map((venta) => (
          <li key={venta.id}>
            <Link href={`/venta/${venta.id}`}>
              <a>{venta.producto}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
