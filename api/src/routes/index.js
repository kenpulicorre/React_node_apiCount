const { Router } = require("express");
const { Country, Activity } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res, next) => {
  res.send(`hola desde landingpage`);
});
router.get("/countries", (req, res, next) => {
  const { name } = req.query;
  if (name) {
    res.send(`hola desde home con query busqueda por nombre pais: ${name}`);
  } else {
    res.send(`hola desde home sin query`);
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

    let countryDb = await Country.findAll({
      // where: { name: ["fire", "flying"] },
      where: { name: country },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    newActivity.addCountry(countryDb);

    res.send(newActivity);
  } catch (error) {
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
