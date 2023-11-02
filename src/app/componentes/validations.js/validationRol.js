export const validationEmail = (input) => {
    const emailRegex = new RegExp(
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    );

    let errors = {};

    if (!emailRegex.test(input.emailUserRol)) {
        errors.emailUserRol = "Debes ingresar un email válido";
    }

    if (input.emailUserRol.length === 0) {
        errors.emailUserRol = "Debes ingresar un email";
    }

    if (input.emailUserRol.length > 50) {
        errors.emailUserRol = "El email debe tener menos de 50 caracteres";
    }

    return errors;
};

export default validationEmail;