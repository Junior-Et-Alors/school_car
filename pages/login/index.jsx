import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import dbConnect from "../../lib/dbConnect";
import School from "../../models/School";
import RegisterForm from "../../components/Form/RegisterForm";
import styles from "./index.module.scss";
import LoginForm from "../../components/Form/LoginForm";

export default function Login({ schoolsByCity }) {
  const schoolsByCityParsed = JSON.parse(schoolsByCity);

  const [displayLoginForm, setDisplayLoginForm] = useState(false);

  return (
    <>
      <Navbar />
      <div>
        <div>
          {displayLoginForm ? (
            <div>
              <LoginForm />
              <p>
                Pas de compte ? Inscrivez vous{" "}
                <button
                  onClick={() => setDisplayLoginForm(!displayRegisterForm)}
                >
                  ici
                </button>
              </p>
            </div>
          ) : (
            <div>
              <RegisterForm schoolsByCityParsed={schoolsByCityParsed} />
              <p>
                Déjà un compte ? Connectez vous{" "}
                <button onClick={() => setd * !displayRegisterForm}>ici</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await School.find().select({ name: 1, address: 1 });

  const schools = result.map((school) => school.toObject());

  schools.forEach((school) => (school._id = school._id.toString()));

  const citiesUnique = [
    ...new Set(schools.map((school) => school.address.city)),
  ];

  const schoolsByCity = citiesUnique.map((city) => ({ town: city }));

  schoolsByCity.map((obj) => {
    obj.schools = result.filter((school) => school.address.city === obj.town);
  });

  return {
    props: {
      schoolsByCity: JSON.stringify(schoolsByCity),
    },
  };
}
