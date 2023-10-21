"use client";
import { useEffect, useState } from "react";
import style from "./login.module.css";
import Link from "next/link";
import validationEmail from "../componentes/validations.js/validationEmail";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { credential, getUserByEmail } from "../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    usuario: "",
    contraseña: "",
  });
  const [mostrarContr, setMostrarContr] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });

    setErrors(
      validationEmail({
        ...input,
        [event.target.id]: event.target.value,
      })
    );
  };

  const user = useSelector((state) => state.user);

  console.log(user);
  useEffect(() => {
    dispatch(getUserByEmail(input.usuario));
  }, [input]);
  const isFormValid =
    Object.keys(errors).length === 0 && input.usuario && input.contraseña;

  const toggleMostrarContr = () => {
    setMostrarContr(!mostrarContr);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credencial = await dispatch(
      credential(input.usuario, input.contraseña)
    );

    if (!isFormValid) {
      alert("Complete de manera correcta los valores");
      return;
    }

    const emailData = {
      subject: "Inicio de sesión exitoso",
      toEmail: input.usuario,
      loginText:
        "Has iniciado sesión exitosamente en nuestra aplicación. te damos la mas cordial Bienvenida a ROFE ferreteria.",
    };

    try {
      const response = await axios.post("/api/nodemailer", emailData);

      if (response === 200) {
        console.log("sesion iniciada con éxito");
      } else {
        console.error("Error al iniciar sesion");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesion:", error);
    }

    if (credencial.payload !== true) {
      alert("El usuario no existe");
      return;
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      try {
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div key="login" className={style.contenedor}>
      <form onSubmit={handleSubmit} className={style.container}>
        <h1 className={style.title}>INGRESO</h1>

        <h3 className={style.subtitle}>Email</h3>

        <div className={style.passwordContainer}>
          <input
            className={errors.usuario ? style.inputWrong : style.input}
            placeholder="Escriba su usuario"
            type="email"
            value={input.usuario}
            id="usuario"
            onChange={handleChange}
          />
        </div>

        {errors.usuario && <p className={style.error}>{errors.usuario}</p>}

        <h3 className={style.subtitle}>Contraseña</h3>
        <div className={style.passwordContainer}>
          <input
            className={
              errors.contraseña ? style.inputWrong : style.passwordInput
            }
            placeholder="Escriba su contraseña"
            type={mostrarContr ? "text" : "password"}
            value={input.contraseña}
            id="contraseña"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={toggleMostrarContr}
            className={style.passwordToggle}
          >
            {mostrarContr ? (
              <span className={style.eyeIcon}>🙈</span>
            ) : (
              <span className={style.eyeIcon}>👁️</span>
            )}
          </button>
        </div>

        {errors.contraseña && <p className={style.p}>{errors.contraseña}</p>}
        <button className={style.button} type="submit">
          {" "}
          Ingresar{" "}
        </button>
        <p>O ingresa con</p>
        <button
          type="button"
          className={style.btnFloating}
          onClick={() => signIn("google")}
        >
          <FontAwesomeIcon icon={faGoogle} />
          <span className={style.googleIcon}></span>
        </button>
        <br></br>
        <p className={style.p}>
          ¿No tienes una cuenta? <Link href="/register">¡Registrate!</Link>
        </p>
        <br></br>
        <p>¿Olvidaste tu contraseña?</p>
        <br></br>
      </form>
    </div>
  );
};

export default LoginPage;
