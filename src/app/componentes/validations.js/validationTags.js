export const validate = (input) => {
    const nameRegex = new RegExp(/^[a-zA-Z]+$/)
    let errors = {};
    
    //CHEADO
    if(!input.name) {
        errors.name = "Escriba un nombre"
    } else if (!nameRegex.test(input.name)) {
        errors.name = "El nombre solo puede tener letras"
    } else if(input.name.length > 20) {
        errors.name = "El tamaño máximo son 20 caracteres"
    }

    return errors
}

export default validate;