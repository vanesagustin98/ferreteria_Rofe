const regex = /^[^\s].*$/;

const validateProductos = (input) => {
    let errors = {};
    if (!regex.test(input.name)) {
        errors.name = "Debes iniciar con una letra o numero";
    }
    if (!input.name) {
        errors.name = "Debes ingresar un nombre de producto"
    }
    if (input.name.length > 50) {
        errors.name = "El nombre del producto debe tener 50 caracteres o menos";
    }

    if (!regex.test(input.descripcion)) {
        errors.descripcion = "Debes iniciar con una letra o numero"
    }

    if (!input.descripcion) {
        errors.descripcion = "Describa el producto o la ubicacion donde lo guarda";
    }

    if (input.descripcion.length > 200) {
        errors.descripcion = "la descripcion del producto debe tener 200 caracteres o menos";
    }
    
    if (!input.costoAnterior) {
        errors.costoAnterior = "Costo Anterior es obligatorio";
    }

    if (!input.costoActual) {
        errors.costoActual = "Costo Actual es obligatorio";
    }

    if (!input.price) {
        errors.price = "Ingrese el porcentaje de ganancia que desea";
    }

    if (!input.stock) {
        errors.stock = "Ingrese la cantidad del producto";
    }
    if (input.stock > 9999){
        errors.stock = "Ingrese una cantidad menor a 10000";
    }

    if (!input.group[0]) {
        
        errors.group = "Elija el grupo"
    }

    if (!input.rubro[0]) {
        
        errors.rubro = "Elija el rubro"
    }

    if (!input.supplierName[0]) {
        
        errors.supplierName = "Elija el proveedor"
    }

    return errors;
}

export default validateProductos;