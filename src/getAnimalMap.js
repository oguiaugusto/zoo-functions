const data = require('../data/zoo_data');

const { species } = data;

function mapAnimalRegions(func, sex = 'both') {
  const regions = ['NE', 'NW', 'SE', 'SW'];
  const toReturn = {};
  regions.map((region) =>
    species.filter((specie) => specie.location === region))
    .forEach((region) => {
      if (sex === 'both') {
        const returnHF = region.map(func);
        toReturn[region[0].location] = returnHF;
      } else {
        const returnHF = region.map((animal) => func(animal, sex));
        toReturn[region[0].location] = returnHF;
      }
    });
  return toReturn;
}

const getAnimalsByRegion = (animal) => animal.name;

const getAnimalNames = (animal) => {
  const { residents } = animal;
  return residents.map((resident) => resident.name);
};

const getAnimalNamesOnly = (animal) => {
  const { name } = animal;
  const names = getAnimalNames(animal);
  return { [name]: names };
};

const getAnimalSorted = (animal) => {
  const { name } = animal;
  const names = getAnimalNames(animal).sort();
  return { [name]: names };
};

const getAnimalsBySex = (animal, sex) => {
  const { name, residents } = animal;
  const names = residents.filter((resident) => resident.sex === sex)
    .map((resident) => resident.name);
  return { [name]: names };
};

const getAnimalsBySexSorted = (animal, sex) => {
  const { name, residents } = animal;
  const names = residents.filter((resident) => resident.sex === sex)
    .map((resident) => resident.name)
    .sort();
  return { [name]: names };
};

const includeAndSort = (sex) => ((sex !== 'both')
  ? mapAnimalRegions(getAnimalsBySexSorted, sex) : mapAnimalRegions(getAnimalSorted));

function getAnimalMap(options = 'none') {
  const { includeNames = false, sorted = false, sex = 'both' } = options;
  if (includeNames && sorted) return includeAndSort(sex);
  if (includeNames) {
    return (sex !== 'both')
      ? mapAnimalRegions(getAnimalsBySex, sex) : mapAnimalRegions(getAnimalNamesOnly);
  }
  return mapAnimalRegions(getAnimalsByRegion);
}

// console.log(getAnimalMap());

module.exports = getAnimalMap;
