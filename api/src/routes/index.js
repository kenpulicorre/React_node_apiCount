const { Router } = require("express");
const { Op } = require("sequelize");

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
//--1)---getapi info countries y agregar a DB-----

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
  const countryToDb = x.slice(0, 5).map(async (e) => {
    await Country.create({
      id: e.id.toUpperCase(),
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
//--1)---fin getapi info countries y agregar a DB-----
//--2)---tomar paises de la DB guardados-----
const getAllInfoCountry = async () => {
  let countryDb = await Country.findAll({
    order: [["name", "ASC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Activity,
      attributes: ["id", "name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
    // attributes: ["name"],
    // through: { attributes: [] },
  });
  return countryDb;
};
//--2)---fin tomar paises de la DB guardados-----
//--3)---tomar paise por nombre de DB guardados-----
const getNameInfoCountry = async (name) => {
  let countryDb = await Country.findAll({
    where: {
      name: { [Op.iLike]: name },
    },
    include: {
      model: Activity,
      attributes: ["id", "name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
    // attributes: ["name"],
    // through: { attributes: [] },
  });
  return countryDb;
};
//--3)---fin tomar paise por nombre de DB guardados-----
//--4)---validar info de  DB guardados-----

const getCountriesFromDB = async () => {
  try {
    const countries = await Country.findAll({
      order: [["name", "ASC"]],
      include: Activity,
    });
    return countries;
  } catch {
    return 0;
  }
};
//--4)---fin validar info de  DB guardados-----

//---fin de funciones

//definiendo rutas iniciales sin modulizar aun
//--------.get("/"--------
router.get("/", async (req, res, next) => {
  // const dbCountry = await addToDbCountry();
  res.send("se llamo y creo en base de datos los paises");
});
//--------fin .get("/"--------
//--------.get("/recarga"--------
router.get("/recarga", async (req, res, next) => {
  const dbCountry = await addToDbCountry();
  res.send("ruta principal ladingpage");
});
//--------fin .get("/recarga"--------

//--------.get("/countries"--------

router.get("/countries", async (req, res, next) => {
  //1er no match esacto,2da matchexacto
  const countriesInDb = await getCountriesFromDB();
  // console.log("hY BASE DE DATOS", countriesInDb.name);
  if (!countriesInDb.length) {
    console.log("no hay base de datos los buscara, ruta: get(/countries");
    const dbCountry = await addToDbCountry();
  } else {
    console.log("Ya existe info en base de datos");
  }

  const { name } = req.query;
  const countryTotal = await getAllInfoCountry(); //1era
  //const countryNamel = await getNameInfoCountry(name); //2da

  if (name) {
    //2da
    // countryNamel.length //2da
    //   ? res.status(200).send(countryNamel)
    //   : res.status(404).send("no esta el pais que busca");
    //fin 2da
    //1era
    let countryName = await countryTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("no esta el pais que busca");
    //fin 1era
  } else {
    // const countryTotal = await getAllInfoCountry(); //2da
    res.json(countryTotal);

    console.log(`hola desde home sin query get("/countries-->`);
  }
});
//-------- fin .get("/countries"--------

//--------.get("/countries/:id"--------

router.get("/countries/:id", async (req, res, next) => {
  const { id } = req.params;
  let countryId = await Country.findOne({
    where: { id: id.toUpperCase() },
    include: {
      model: Activity,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      through: {
        attributes: [],
      },
    },
  });
  // let countryId = await Country.findByPk(id.toUpperCase());

  if (countryId === null) {
    res.status(400).send("no se encuentra Pais");
  } else {
    !countryId.id.length
      ? res.status(400).send("no se encuentra Pais")
      : res.status(200).json(countryId);
    console.log(
      `hola  desde params, get(/countries/:id:, busqueda de pais por id ${id}`
    );
  }
});
//--------fin .get("/countries/:id"--------

router.post("/activity", async (req, res, next) => {
  const { name, difficulty, duration, season, country } = req.body;
  try {
    const [newActivity] = await Activity.findOrCreate({
      where: { name, difficulty, duration, season },
    });
    // const newActivity = await Activity.create({name,difficulty,duration,season,});
    let countryDb = await Country.findAll({
      // where: { name: ["fire", "flying"] },
      where: { name: country },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    // let vc;
    // vc = await countryDb;
    // await console.log("vc solito", vc);
    // await console.log("pais agregado (post(/activity ", vc[0].name);

    await newActivity.addCountry(countryDb);
    if (countryDb.length) {
      //res.send(countryDb);

      res.send(`actividad ${name} creada en pais ${country}`);
    } else {
      res.send(`actividad: ${name} , creada, sin pais`);
    }
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.send("ya existe el nombre de la actividad");
    }
    res.send(error);
  }
});

//prueba get /activity:
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
