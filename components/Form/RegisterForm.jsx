import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateRegisterSchema } from "../../utils/ValidateRegister";

export default function RegisterForm({ schoolsByCityParsed }) {
  const listTownAvailable = schoolsByCityParsed.map((obj) => obj.town);

  const validationSchema = validateRegisterSchema;

  const [cityChoose, setCityChoose] = useState(listTownAvailable[0]);
  const [listSchoolAvailable, setListSchoolAvailable] = useState([]);

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  useEffect(() => {
    const listSchool = schoolsByCityParsed.filter((obj) => {
      return obj.town === cityChoose;
    });
    if (listSchool.length) setListSchoolAvailable(listSchool[0].schools);
  }, [cityChoose]);

  const onSubmit = async (data) => {
    const dataObj = {
      lastName: data.lastName,
      firstName: data.firstName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: {
        street: data.streetNumber + " " + data.streetName,
        city: data.city,
      },
      password: data.password,
      school: data.school,
    };

    await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center">Inscription</h1>
            <div className="form-group mb-3">
              <label htmlFor="name">Prénom:</label>
              <input
                type="text"
                className="form-control"
                {...register("firstName")}
                name="firstName"
                id="firstName"
              />
              <small className="text-danger">{errors.firstName?.message}</small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="name">Nom De famille:</label>
              <input
                type="text"
                className="form-control"
                {...register("lastName")}
                name="lastName"
                id="lastName"
              />
              <small className="text-danger">{errors.lastName?.message}</small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                {...register("email")}
              />
              <small className="text-danger">{errors.email?.message}</small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">password:</label>
              <input
                type="password"
                className="form-control"
                {...register("password")}
                name="password"
                id="password"
              />
              <small className="text-danger">{errors.password?.message}</small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">confirmPassword:</label>
              <input
                type="password"
                className="form-control"
                {...register("confirmPassword")}
                name="confirmPassword"
                id="confirmPassword"
              />
              <small className="text-danger">
                {errors.confirmPassword?.message}
              </small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phoneNumber">Numéro de téléphone:</label>
              <input
                type="number"
                className="form-control"
                {...register("phoneNumber")}
                name="phoneNumber"
                id="phoneNumber"
              />
              <small className="text-danger">
                {errors.phoneNumber?.message}
              </small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="city">Choisissez votre ville:</label>
              <select
                name="city"
                id="city"
                {...register("city")}
                onChange={(e) => setCityChoose(e.target.value)}
                defaultValue={cityChoose}
              >
                {listTownAvailable.map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>
              <small className="text-danger">{errors.city?.message}</small>
            </div>

            {cityChoose && (
              <div className="form-group mb-3">
                <label htmlFor="city">Choisissez votre école:</label>
                <select
                  name="school"
                  id="school"
                  {...register("school")}
                  defaultValue={listSchoolAvailable[0]}
                >
                  <option disabled selected></option>
                  {listSchoolAvailable.map((school) => (
                    <option key={school._id} value={school.name}>
                      {school.name}
                    </option>
                  ))}
                </select>
                <small className="text-danger">{errors.school?.message}</small>
              </div>
            )}
            <div className="form-group mb-3">
              <label htmlFor="streetNumber">entrez votre numéro de rue:</label>
              <input
                className="form-control"
                {...register("streetNumber")}
                type="number"
                name="streetNumber"
                id="streetNumber"
              />
              <small className="text-danger">
                {errors.streetNumber?.message}
              </small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="streetName">entre votre nom de rue:</label>
              <input
                className="form-control"
                {...register("streetName")}
                type="text"
                name="streetName"
                id="streetName"
              />
              <small className="text-danger">
                {errors.streetName?.message}
              </small>
            </div>

            <div className="form-group d-flex justify-content-center mt-4 justify-content-md-end gap-3">
              <button type="submit" className="btn btn-primary">
                S inscrire
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => reset()}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
