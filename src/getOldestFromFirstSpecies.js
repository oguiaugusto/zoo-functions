const data = require('../data/zoo_data');

const { species, employees } = data;

function getOldestFromFirstSpecies(id) {
  const animalId = employees.find((emp) => emp.id === id).responsibleFor[0];
  const animals = species.find((specie) => specie.id === animalId).residents;
  const oldestAge = Math.max(...animals.map((animal) => animal.age));
  const animal = animals.find((ani) => ani.age === oldestAge);
  const { name, sex, age } = animal;
  return [name, sex, age];
}

module.exports = getOldestFromFirstSpecies;
