import * as Yup from "yup";

export const validateLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("email invalide")
    .required("Veuillez entrez votre mail saisi lors de votre enregistrement"),
  password: Yup.string().required(
    "Veuillez entrez votre mot de passe saisi a l'enregistrement"
  ),
});
