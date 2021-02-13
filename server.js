const db = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const landingPage = require('./views/landingPage');
const { urlencoded } = require('express');

const port = process.env.port || 3001;

app.use(morgan('dev'));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.listen(port, () => console.log(`listening on ${port}`));

app.get('/', async (req, res, next) => {
  try {
    res.send(landingPage());
  } catch (err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  const person = req.body.person;
  const place = req.body.place;
  const thing = req.body.thing;
  const personSearch = await db.models.Person.findAll({
    where: {
      name: person,
    },
  });
  const placeSearch = await db.models.Place.findAll({
    where: {
      location: place,
    },
  });
  const thingSearch = await db.models.Thing.findAll({
    where: {
      name: thing,
    },
  });
  personSearchId = personSearch[0].dataValues.id;
  placeSearchId = placeSearch[0].dataValues.id;
  thingSearchId = thingSearch[0].dataValues.id;

  try {
    console.log(personSearchId);
    console.log(placeSearchId);
    console.log(thingSearchId);
  } catch (err) {
    next(err);
  }
});
