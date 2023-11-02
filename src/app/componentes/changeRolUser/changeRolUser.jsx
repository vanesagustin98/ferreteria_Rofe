"use client";
import style from "./rol.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail, putUsers } from "@/app/redux/actions/actions";

const ChangeRolUser = () => {
  let dispatch = useDispatch();

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

  const userGlobal = useSelector((state) => state.user);
  const [userEmail, setUserEmail] = useState({});

  useEffect(() => {
    setUserEmail(userGlobal);
  }, [userGlobal]);

  useEffect(() => {
    if (inputrol.emailUserRol) {
      dispatch(getUserByEmail(inputrol.emailUserRol));
    }
  }, [dispatch, inputrol.emailUserRol]);

  const handleGetUserByEmail = () => {
    if (
      Object.keys(userEmail).length !== 0 &&
      inputrol.emailUserRol === userEmail.emailUser
    ) {
      let newUser = {
        idUser: userEmail.idUser,
        emailUser: userEmail.emailUserRol,
        passwordUser: userEmail.passwordUser,
        rolUser: inputrol.roleUser,
        nameUser: userEmail.nameUser,
        isActiveUser: userEmail.isActiveUser,
      };
      if (newUser.rolUser != "") {
        console.log("newUser ", newUser);
        dispatch(putUsers(newUser));
        alert("Rol de usuario cambiado exitosamente");
      } else {
        alert("Por favor seleccione un Rol");
      }
    } else {
      alert("El Email ingresado no existe, por favor verifique");
    }
  };

  const user =
    typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;
  useEffect(() => {
    // Si el usuario no está presente y estás en un entorno de navegador
    if (!user && typeof window !== "undefined" && window.localStorage) {
      // Redirige al usuario a la página de inicio de sesión
      window.location.replace("/login");
    }
  }, []);

  return (
    <div className={style.container}>
      <h1 className={style.title}>CAMBIO DE ROL</h1>
      <h3 className={style.subtitle}>
        Ingrese el Email del usuario a modificar
      </h3>
      <input
        className={style.input}
        type="text"
        id="emailUserRol"
        placeholder="ejemplo@gmail.com"
        value={inputrol.emailUserRol}
        onChange={handleInputrolChange}
      />
      <h3 className={style.subtitle}>Seleccione el rol:</h3>
      <select
        className={style.select}
        id="roleUser"
        value={inputrol.roleUser}
        onChange={handleInputrolChange}
      >
        <option value="" disabled selected>
          Rol
        </option>
        <option value="admin">Admin</option>
        <option value="employee">Employee</option>
      </select>
      <button className={style.button} onClick={handleGetUserByEmail}>Editar Usuario</button>
    </div>
  );
};

export default ChangeRolUser;
