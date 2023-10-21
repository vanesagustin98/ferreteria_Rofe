"use client"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByName } from "@/app/redux/actions/actions";
import s from "@/app/componentes/SearchBar/SearchBar.module.css";

function SearchBar() {
    const [state, setState] = useState("");
    const dispatch = useDispatch();

    function handleChange(e) {
        e.preventDefault();
        setState(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (state.length > 1) {
            dispatch(getProductByName(state));
            setState("");
        } else {
            alert("Ingrese un Producto");
        }
    }

    return (
        <div className={s.search}>
                <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
                    <div className={s.input}>
                        <span htmlFor="name"></span>
                        <input
                            type="text"
                            autoComplete="off"
                            value={state}
                            placeholder="Producto"
                            onChange={(e) => handleChange(e)}
                        />
                        <button type="submit" className={s.btn}>
                            Buscar
                        </button>
                    </div>
                </form>
        </div>
    );
}

export default SearchBar;
