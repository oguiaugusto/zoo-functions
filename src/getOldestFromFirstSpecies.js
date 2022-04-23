const { species, employees } = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const animalId = employees.find((emp) => emp.id === id).responsibleFor[0];
  const { residents } = species.find((specie) => specie.id === animalId);

  const largestAge = Math.max(...residents.map((animal) => animal.age));
  const { name, sex, age } = residents.find((ani) => ani.age === largestAge);

  return [name, sex, age];
}

module.exports = getOldestFromFirstSpecies;
