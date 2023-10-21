export const validationEmail = (input) => {
    const emailRegex = new RegExp(
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    );

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,16}$/;

    let errors = {};

    if (!emailRegex.test(input.usuario)) {
        errors.usuario = "Debes ingresar un email válido";
    }

    if (input.usuario.length === 0) {
        errors.usuario = "Debes ingresar un email";
    }

    if (input.usuario.length > 50) {
        errors.usuario = "El email debe tener menos de 50 caracteres";
    }

    if (!passwordRegex.test(input.contraseña)) {
        errors.contraseña = "La contraseña debe tener al menos un número y una mayúscula";
    }

    if (input.contraseña.length === 0) {
        errors.contraseña = "Debes ingresar una contraseña";
    }

    if (input.contraseña.length < 6) {
        errors.contraseña = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
};

export default validationEmail;