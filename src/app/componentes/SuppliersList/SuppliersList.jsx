import React from 'react'
import s from '@/app/componentes/SuppliersList/SuppliersList.module.css'
function SuppliersList({ id_suppliers,name, cellphone, direction, name_company, email }) {
  return (
    <div className={s.all}>
      <div className={s.container}>
        <div className={s.a}>
          {name_company}
        </div>
        <div className={s.b}>
          {name}
        </div>
        <div className={s.c}>
          {direction}
        </div>
        <div className={s.d}>
          {email}
        </div>
        <div className={s.e}>
          {cellphone}
        </div>
      </div>
    </div>
  )
}

export default SuppliersList