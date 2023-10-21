import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/registro">Registrar Venta</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
