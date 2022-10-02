import * as Yup from "yup";

export const validateRegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Veuillez renseigner votre prénom.")
    .min(2, "Pas assez de caractères!")
    .max(25, "Trop de caractères!"),
  lastName: Yup.string()
    .required("Veuillez renseigner votre nom de famille.")
    .min(2, "Pas assez de caractères!")
    .max(25, "Trop de caractères!"),
  email: Yup.string()
    .email("Cet email est invalide.")
    .required("Veuillez renseigner votre adresse e-mail"),
  password: Yup.string()
    .required("Veuillez renseigner un mot de passe.")
    .matches(/([0-9])/, "Le mot de passe doit contenir au moins un chiffre.")
    .min(8, "Le mot de passe doit être plus grand que 8 caractères.")
    .max(30, "Le mot de passe doit être plus petit que 50 caractères."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Le mot de passe de confirmation ne correspond pas"
  ),
  phoneNumber: Yup.string()
    .required("Veuillez renseigner votre numéro de téléphone.")
    .test(
      "length",
      "Le numéro de téléphone doit etre composé de 10 chiffres!",
      (val) => val.toString().length === 10
    ),
  city: Yup.string()
    .required("Veuillez selectionner votre ville.")
    .test(
      "length",
      "La ville ne peut etre null",
      (val) => val.toString() !== ""
    ),
  school: Yup.string().required("Veuillez selectionner votre école."),
  streetNumber: Yup.string().notRequired(),
  streetName: Yup.string().required("Veuillez renseigner votre numéro de rue."),
});
