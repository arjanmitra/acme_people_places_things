const {
  db,
  models: { Person, Place, Thing, Purchase },
} = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');

const landingPage = require('./views/landingPage');
const { urlencoded } = require('express');
const port = process.env.port || 3001;

app.use(morgan('dev'));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.listen(port, () => console.log(`listening on ${port}`));

const Purchases = async () => {
  const purchasesObject = await Purchase.findAll({
    include: [
      {
        model: Person,
      },
      {
        model: Place,
      },
      {
        model: Thing,
      },
    ],
  });
  return purchasesObject;
};

const People = async () => {
  const peopleObject = await db.models.Person.findAll();
  const peopleArrayExtracted = peopleObject.map((elem) => elem.dataValues.name);
  return peopleArrayExtracted;
};

const Places = async () => {
  const placesObject = await db.models.Place.findAll();
  const placesArrayExtracted = placesObject.map(
    (elem) => elem.dataValues.location
  );
  return placesArrayExtracted;
};
const Things = async () => {
  const thingsObject = await db.models.Thing.findAll();
  const thingsArrayExtracted = thingsObject.map((elem) => elem.dataValues.name);
  return thingsArrayExtracted;
};

app.get('/', async (req, res, next) => {
  try {
    //const allPurchases = await Purchases();
    console.log(await Purchases());
    res.send(
      landingPage(
        await Purchases(),
        await People(),
        await Places(),
        await Things()
      )
    );
  } catch (err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  const person = req.body.person;
  const place = req.body.place;
  const thing = req.body.thing;
  const numberOfThings = req.body.numberOfThings;
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
  if (personSearch === []) {
    personSearchResult = null;
  } else {
    personSearchResult = personSearch[0].dataValues.id;
  }

  if (placeSearch === []) {
    placeSearchResult = null;
  } else {
    placeSearchResult = placeSearch[0].dataValues.id;
  }

  if (thingSearch === []) {
    thingSearchResult = null;
  } else {
    thingSearchResult = thingSearch[0].dataValues.id;
  }

  try {
    console.log(req.body);
    await db.models.Purchase.create({
      numberOfThings: numberOfThings,
      PersonId: personSearchResult,
      PlaceId: placeSearchResult,
      ThingId: thingSearchResult,
    });
    res.send(
      landingPage(
        await Purchases(),
        await People(),
        await Places(),
        await Things()
      )
    );
    console.log('inserted!');
  } catch (err) {
    next(err);
  }
});

app.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await db.models.Purchase.destroy({
      where: {
        id: id,
      },
    });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});
