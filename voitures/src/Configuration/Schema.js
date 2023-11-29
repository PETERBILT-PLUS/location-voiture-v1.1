import * as yup from "yup";

export const registerSchema = yup.object().shape({
    username: yup.string().required("Nom est required"),
    email: yup.string().email("Entrer des caracters email").required("Entrer votre Email"),
    password: yup.string().min(5, "Il faut exrire 5 caracrères au moin").required("Entrer votre password (min 5 caracteres)"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "password incorrect").required("required"),
});

export const loginSchema = yup.object().shape({
    email: yup.string().email("Entrer des caracters email").required("Entrer votre Email"),
    password: yup.string().min(5, "Il faut exrire 5 caracrères au moin").required("Entrer votre password (min 5 caracteres)"),
});

export const contactSchema = yup.object().shape({
    name: yup.string().required("Ecrire votre nom"),
    email: yup.string().email("Entrer des caracters email").required("Entrer votre Email"),
    message: yup.string().required("Ecrire votre message"),
});

export const accountShema = yup.object().shape({
    username: yup.string().required("Entrer votre nom"),
    email: yup.string().email("Entrer des caracters email").required("Entrer votre Email"),
    password: yup.string().min(5, "Il faut exrire 5 caracrères au moin").required("Entrer votre password (min 5 caracteres)"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "password incorrect").required("required"),
});