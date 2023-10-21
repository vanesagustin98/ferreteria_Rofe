import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data } = useSession();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="col-3 p-0">
          <a
            className="navbar-brand"
            style={{ marginLeft: "20px" }}
            href="#"
          ></a>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center d-flex flex-row">
          {data?.user ? (
            <>
              <span style={{ marginRight: "15px" }}>
                <img
                  src={data?.user?.image}
                  height="25"
                  width="25"
                  alt="user image"
                />
                ¡Hola <b>{data?.user?.name}</b>!
              </span>

              <span className="logout-button" onClick={() => signOut()}>
                {" "}
                Salir
              </span>
            </>
          ) : (
            <span className="login-link">
              {" "}
              <Link className="nav-link" href="/login">
                Ingresar
              </Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
