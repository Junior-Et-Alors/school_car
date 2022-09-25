import styles from "./index.module.scss";
import Image from "next/image";
import bgLogin from "../../public/assets/bg-login.jpg";
import Navbar from "../../components/Navbar/Navbar";
import { useState, useRef, useEffect } from "react";
import dbConnect from "../../lib/dbConnect";
import School from "../../models/School";

export default function Login({ schoolByCity }) {
  const schoolsByCityParsed = JSON.parse(schoolByCity);
  // console.log("schoolsByCityParsed", schoolsByCityParsed);

  const cities = Object.keys(schoolsByCityParsed);
  // console.log("cities", cities);

  const schools = Object.entries(schoolsByCityParsed);
  console.log("schools", schools);

  // const cityParsed = schoolsParsed.map((school) => {
  //   return school.address.city;
  // });
  // const cityUnique = [...new Set(cityParsed)];

  // const schoolNameParse = schoolsParsed.map((school) => {
  //   return school.name;
  // });

  // const test = cityUnique.map((city) => {
  //   const nimp = [];
  //   return schoolsParsed.filter((school) => {
  //     return school.address.city === city.name;
  //   });
  // });

  const [stateOnglets, setStateOnglets] = useState(2);

  const [registerName, setRegisterName] = useState("");
  const [registerPrenom, setRegisterPrenom] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerAdressNumber, setRegisterAdressNumber] = useState(null);
  const [registerAdressRoad, setRegisterAdressRoad] = useState("");
  const [registerAdressPostalCode, setRegisterAdressPostalCode] =
    useState(null);
  const [registerAdressCity, setRegisterAdressCity] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordAgain, setRegisterPasswordAgain] = useState("");
  const [registerSchool, setRegisterSchool] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const goRegister = () => {
    setStateOnglets(2);
  };

  const goLogin = () => {
    setStateOnglets(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerPassword != registerPasswordAgain) {
      return alert("Les mots de passe sont différents");
    }

    const dataObj = {
      lastName: registerName,
      firstName: registerPrenom,
      email: registerEmail,
      phoneNumber: registerNumber,
      address: {
        street: registerAdressNumber + " " + registerAdressRoad,
        zip: registerAdressPostalCode,
        city: registerAdressCity,
      },
      password: registerPasswordAgain,
      school: registerSchool,
    };
    console.log(dataObj);

    await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataObj),
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.modalContainer}>
          {stateOnglets === 1 ? (
            <div className={styles.modal}>
              <h2>Connexion</h2>
              <form action="">
                <div>
                  <input
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={styles.fullWidth}
                    required
                    type="email"
                    placeholder="Email :"
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={styles.fullWidth}
                    required
                    type="password"
                    placeholder="Mot de passe :"
                  />
                </div>
                <div>
                  <button type="submit" className={styles.buttonDark}>
                    Se connecter
                  </button>
                </div>
              </form>

              <div>
                <p>
                  Pas de compte ? Inscrivez vous{" "}
                  <button onClick={goRegister}>ici</button>
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.modal}>
              <h2>S'inscrire</h2>
              <form action="">
                <div className={styles.formNames}>
                  <input
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                    type="text"
                    placeholder="Nom"
                  />
                  <input
                    onChange={(e) => setRegisterPrenom(e.target.value)}
                    required
                    type="text"
                    placeholder="Prénom"
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => setRegisterNumber(e.target.value)}
                    required
                    className={styles.fullWidth}
                    type="number"
                    maxLength="10"
                    minLength="10"
                    placeholder="Numéro de téléphone"
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                    className={styles.fullWidth}
                    type="email"
                    name=""
                    id=""
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => setRegisterAdressNumber(e.target.value)}
                    className={styles.noArrow}
                    required
                    type="number"
                    name=""
                    id=""
                    placeholder="Numéro de voie"
                  />
                  <input
                    onChange={(e) => setRegisterAdressRoad(e.target.value)}
                    required
                    type="text"
                    name=""
                    id=""
                    placeholder="Rue"
                  />
                  <input
                    onChange={(e) =>
                      setRegisterAdressPostalCode(e.target.value)
                    }
                    className={styles.noArrow}
                    required
                    type="number"
                    maxLength="5"
                    placeholder="Code Postal"
                  />
                  <input
                    onChange={(e) => setRegisterAdressCity(e.target.value)}
                    required
                    type="text"
                    placeholder="Ville"
                  />
                </div>

                <div>
                  <select
                    onChange={(e) => setRegisterSchool(e.target.value)}
                    className={styles.fullWidth}
                    name=""
                    id=""
                  >
                    {cities.map((city, i) => (
                      <optgroup label={city} key={i}>
                        {schools.map((school) => (
                          <option key={school[1][0]._id}>
                            {school[1][0].name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    className={styles.fullWidth}
                    type="password"
                    minLength="6"
                    placeholder="Mot de passe"
                  />
                  <input
                    onChange={(e) => setRegisterPasswordAgain(e.target.value)}
                    required
                    className={styles.fullWidth}
                    type="password"
                    minLength="6"
                    placeholder="Mot de passe"
                  />
                </div>
                <div>
                  <button onClick={handleSubmit} className={styles.buttonDark}>
                    S'inscrire
                  </button>
                </div>
              </form>
              <div>
                <p>
                  Déjà un compte ? Connectez vous{" "}
                  <button onClick={goLogin}>ici</button>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.image}></div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const result = await School.find().select({ name: 1, "address.city": 1 });

  const schools = result.map((school) => {
    return school.toObject();
  });

  schools.forEach((school) => {
    school._id = school._id.toString();
  });

  const allCities = schools.map((school) => school.address.city);

  const citiesUnique = [...new Set(allCities)];

  const schoolByCity = {};

  citiesUnique.forEach((citie) => {
    schoolByCity[citie] = schools.filter((school) => {
      return school.address.city === citie;
    });
  });

  return {
    props: {
      // schools: JSON.stringify(schools),
      schoolByCity: JSON.stringify(schoolByCity),
    },
  };
}
