import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateLoginSchema } from "../../utils/ValidateLogin";

export default function LoginForm({ schoolsByCityParsed }) {
  const validationSchema = validateLoginSchema;

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center">Connexion</h1>
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
