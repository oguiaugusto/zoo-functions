const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const returnSpecies = [];
  ids.forEach((id) => returnSpecies.push(species.find((specie) => specie.id === id)));
  return returnSpecies;
}

module.exports = getSpeciesByIds;
