"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../componentes/NavBar/NavBar";
import { getDetailSale } from "../../redux/actions/actions";


function HistoryDetail({ params }) {
    const id = params.id;
    const dispatch = useDispatch();
    const saleDetail = useSelector((state) => state.detailSale);
    useEffect(() => {
        dispatch(getDetailSale(id));
    }, [dispatch, id]);
    console.log(saleDetail.saleDetail);
    return (
        <div>
            <NavBar/>
            {
                 saleDetail.map((product, index) => (
                    <div key={index}>
                    <div>Nombre: {product.Product}</div>
                    <div>Cantidad: {product.amount}</div>
                    <div>Precio: {product.unitPrice}</div>
                    <div>Precio Total:{product.finalPrice}</div>
         
                    </div>
                ))
            }

        </div>
    )

}

export default HistoryDetail;