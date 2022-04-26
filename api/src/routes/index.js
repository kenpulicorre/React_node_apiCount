const { Router } = require("express");
const { Country, Activity } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const axios = require("axios");
const urlAll = `https://restcountries.com/v3/all`;
const urlAllT = ` https://pokeapi.co/api/v2/type`;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//---funciones
//++++getapi info countries-----

const getApiInfoCountries = async () => {
  try {
    const countryApi = await axios.get(urlAll); //para apinfo
    const apiInfo = await countryApi.data.map((e) => {
      let capital = e.capital ? e.capital[0] : "no info";
      return {
        id: e.cca3, //es como el id
        name: e.translations.spa.common,
        img_flag: e.flags[1],
        continent: e.continents[0],
        capital: capital,
        subregion: e.subregion,
        area: e.area,
        people: e.population,
      };
    });
    return apiInfo;
    //---fin solo 20------
  } catch (error) {
    console.log(error);
  }
};

const addToDbCountry = async () => {
  const x = await getApiInfoCountries();
  console.log(x[0]);
  // return { img_flag, continent, capital, subregion, area, people };
  const countryToDb = x.slice(0, 50).map(async (e) => {
    await Country.create({
      id: e.id,
      name: e.name,
      img_flag: e.img_flag,
      continent: e.continent,
      capital: e.capital,
      subregion: e.subregion,
      area: e.area,
      people: e.people,
    });
  });

  return { x };
};
//++++fin getapi info countries-----
//---fin de funciones

//definiendo rutas iniciales sin modulizar aun
router.get("/", async (req, res, next) => {
  const dbCountry = await addToDbCountry();
  res.send("se llamo y creo en base de datos los paises");
});

router.get("/countries", async (req, res, next) => {
  const { name } = req.query;

  let countryDb = await Country.findAll({
    order: [["name", "ASC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Activity,
      // attributes: ["name"],
      // through: {
      //   attributes: [],
      // },
    },
    // attributes: ["name"],
    // through: { attributes: [] },
  });

  if (name) {
    res.send(`hola desde home con query busqueda por nombre pais: ${name}`);
  } else {
    res.json(countryDb);
    console.log(`hola desde home sin query get("/countries-->`);
  }
});

router.get("/countries/:id", (req, res, next) => {
  const { id } = req.params;
  res.send(`hola  desde params:, busqueda de pais por id ${id}`);
});
router.get("/activity", async (req, res) => {
  const actividades = await Activity.findAll({
    include: {
      model: Country,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  res.send(actividades);
});
router.post("/activity", async (req, res, next) => {
  const { name, difficulty, duration, season, country } = req.body;
  try {
    let newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // let newActivity2= Activity.findOrCreate({
    //   where: {
    //     name,
    //     difficulty,
    //     duration,
    //     season,
    //     url: e.url,
    //   },
    // });

    let countryDb = await Country.findAll({
      // where: { name: ["fire", "flying"] },
      where: { name: country },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log("countryDb----", countryDb.data);
    newActivity.addCountry(countryDb);

    res.send(newActivity);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.send("ya existe el nombre de la actividad");
    }
    res.send(error);
  }
});

//prueba post para crear paises:
router.post("/countries", async (req, res, next) => {
  const { name, img_flag, continent, capital, subregion, area, people } =
    req.body;
  try {
    let newCountry = await Country.create({
      name,
      img_flag,
      continent,
      capital,
      subregion,
      area,
      people,
    });

    res.send(req.body);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
