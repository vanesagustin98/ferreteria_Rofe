export const validationRegister = (input) => {
    const emailRegex = new RegExp(
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    );

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,16}$/;
    const regexNum = /^[^\d]+$/;

    let errors = {};

    if (input.nameUser.length === 0) {
        errors.nameUser = "Debes ingresar tu nombre";
    }

    if (input.nameUser.length > 50) {
        errors.nameUser = "El nombre debe tener menos de 50 caracteres";
    }

    if (input.nameUser.length < 10) {
        errors.nameUser = "El nombre debe tener al menos 10 caracteres";
    }

    if (!regexNum.test(input.nameUser)) {
        errors.nameUser = "El nombre no debe contener números";
    }

    if (!emailRegex.test(input.emailUser)) {
        errors.emailUser = "Debes ingresar un email válido";
    }

    if (input.emailUser.length === 0) {
        errors.emailUser = "Debes ingresar un email";
    }

    if (input.emailUser.length > 50) {
        errors.emailUser = "El email debe tener menos de 50 caracteres";
    }

    if (!passwordRegex.test(input.passwordUser)) {
        errors.passwordUser = "La contraseña debe tener al menos un número y una mayúscula";
    }

    if (!input.passwordUser) {
        errors.passwordUser = "Debes ingresar una contraseña";
    }

    if (input.passwordUser.length < 6) {
        errors.passwordUser = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
};

export default validationRegister;