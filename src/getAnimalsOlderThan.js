const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const animalInfo = species.find((specie) => specie.name === animal).residents;
  return animalInfo.every((resident) => resident.age >= age);
}

module.exports = getAnimalsOlderThan;
