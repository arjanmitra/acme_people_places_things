const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize('postgres://localhost/acmepeopleplacesthings');

const Person = db.define('Person', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Place = db.define('Place', {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Thing = db.define('Thing', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const Purchase = db.define('Purchase', {
  numberOfThings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Person.beforeSave((person) => {
//   if (person.PersonId === '') {
//     person.PersonId = null;
//   }
// });

// Place.beforeCreate('Place', async (place) => {
//   if (place.PlaceId === 'not selected') {
//     place.PlaceId = null;
//   }
// });

// Thing.beforeCreate('Thing', async (thing) => {
//   if (thing.ThingId === 'not selected') {
//     thing.ThingId = null;
//   }
// });

Purchase.belongsTo(Person);
Person.hasMany(Purchase);
Purchase.belongsTo(Place);
Place.hasMany(Purchase);
Purchase.belongsTo(Thing);
Thing.hasMany(Purchase);

const syncSeed = async () => {
  try {
    await db.authenticate();
    console.log('connected!');
    await db.sync({ force: true });
    const [moe, lucy, larry] = await Promise.all(
      ['moe', 'lucy', 'larry'].map((name) => Person.create({ name }))
    );
    const [nyc, chicago, la, dallas] = await Promise.all(
      ['nyc', 'chicago', 'la', 'dallas'].map((location) =>
        Place.create({ location })
      )
    );
    const [foo, bar, bazz, quq] = await Promise.all(
      ['foo', 'bar', 'bazz', 'quq'].map((name) => Thing.create({ name }))
    );
    //const moe = await Person.create({ name: 'moe' });
  } catch (err) {
    console.log(err);
  }
};
syncSeed();

module.exports = {
  db,
  models: { Person, Place, Thing, Purchase },
};
