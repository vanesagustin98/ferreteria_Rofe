"use client";
import style from "./register.module.css";
import Link from "next/link";
import validationRegister from "../componentes/validations.js/validationRegister";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { postUsers } from "../redux/actions/actions";
import NavBar from "../componentes/NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail, putUsers } from "../redux/actions/actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    nameUser: "",
    emailUser: "",
    passwordUser: "",
  });

  const [mostrarContr, setMostrarContr] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });

    setErrors(
      validationRegister({
        ...input,
        [event.target.id]: event.target.value,
      })
    );
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    input.nameUser &&
    input.emailUser &&
    input.passwordUser;

  const toggleMostrarContr = () => {
    setMostrarContr(!mostrarContr);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) {
      alert("Complete de manera correcta los valores");
      return;
    }
    //console.log(input);
    dispatch(postUsers(input));

    const emailData = {
      subject: "Registro exitoso",
      toEmail: input.emailUser,
      otpText:
        "Gracias por registrarte en nuestra aplicación. Será un gusto atenderte ¡Bienvenido a ferreteria ROFE!",
    };
    //console.log("datos a enviar", emailData);
    try {
      const response = await axios.post("/api/nodemailer", emailData);

      if (response === 200) {
        console.log("Correo de registro enviado con éxito");
      } else {
        console.error("Error al enviar el correo de registro");
      }
    } catch (error) {
      console.error("Error al enviar el correo de registro:", error);
    }
    alert("El usuario fue creado correctamente");
  };
  const [inputrol, setInputrol] = useState({
    emailUserRol: "",
    roleUser: "",
  });

  const handleInputrolChange = (event) => {
    const { id, value } = event.target;
    setInputrol({
      ...inputrol,
      [id]: value,
    });
  };

  const userEmail = useSelector(state => state.user)
  useEffect(() => {
    if (inputrol.emailUserRol) {
      dispatch(getUserByEmail(inputrol.emailUserRol));
    }
  }, [dispatch, inputrol.emailUserRol]);
  const handleGetUserByEmail = () => {

    const newUser = {
      idUser: userEmail.idUser,
      emailUser: userEmail.emailUserRol,
      passwordUser: userEmail.passwordUser,
      rolUser: inputrol.roleUser,
      nameUser: userEmail.nameUser,
      isActiveUser: userEmail.isActiveUser
    }

    console.log("newUser ", newUser);
    dispatch(putUsers(newUser))
  };
  const user = typeof localStorage !== 'undefined' ? localStorage.getItem("user") : null;
  useEffect(() => {

    // Si el usuario no está presente y estás en un entorno de navegador
    if (!user && typeof window !== 'undefined' && window.localStorage) {
      // Redirige al usuario a la página de inicio de sesión
      window.location.replace("/login");
    }
  }, []);

  return (
    <div key="login">
      <NavBar />
      <form onSubmit={handleSubmit} className={style.container}>
        <h1 className={style.title}>REGISTRO</h1>

        <h3 className={style.subtitle}>Nombre</h3>
        <div className={style.passwordContainer}>
          <input
            className={errors.nameUser ? style.inputWrong : style.input}
            placeholder="Escriba su nombre completo"
            type="text"
            value={input.nameUser}
            id="nameUser"
            onChange={handleChange}
          />
        </div>

        {errors.nameUser && <p className={style.p}>{errors.nameUser}</p>}

        <h3 className={style.subtitle}>Email</h3>

        <div className={style.passwordContainer}>
          <input
            className={errors.emailUser ? style.inputWrong : style.input}
            placeholder="Escriba su email"
            type="email"
            value={input.emailUser}
            id="emailUser"
            onChange={handleChange}
          />
        </div>

        {errors.emailUser && <p className={style.p}>{errors.emailUser}</p>}

        <h3 className={style.subtitle}>Contraseña</h3>
        <div className={style.passwordContainer}>
          <input
            className={
              errors.passwordUser ? style.inputWrong : style.passwordInput
            }
            placeholder="Escriba su contraseña"
            type={mostrarContr ? "text" : "password"}
            value={input.passwordUser}
            id="passwordUser"
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

        {errors.passwordUser && (
          <p className={style.p}>{errors.passwordUser}</p>
        )}

        <button className={style.button} type="submit">
          Crear Cuenta
        </button>
        <p>O registrate con</p>
        <button
          type="button"
          className={style.btnFloating}
          onClick={() => signIn("google")}
        >
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <br />
      </form>
      <div>
        <p>Ingrese el Email del usuario a modificar</p>
        <input
          type="text"
          id="emailUserRol"
          value={inputrol.emailUserRol}
          onChange={handleInputrolChange}
        />
        <p>Seleccione el rol:</p>
        <select
          id="roleUser"
          value={inputrol.roleUser}
          onChange={handleInputrolChange}
        >
          <option disable value="">Rol</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <button onClick={handleGetUserByEmail}>Editar Usuario</button>
      </div>
    </div>
  );
};

export default LoginPage;
