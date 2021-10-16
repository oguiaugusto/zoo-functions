const data = require('../data/zoo_data');

const { species } = data;

function mapAnimalRegions(mapFunction, sex = 'both') {
  const regions = ['NE', 'NW', 'SE', 'SW'];
  const mapObject = {};
  regions.map((region) =>
    species.filter((specie) => specie.location === region))
    .forEach((specie) => {
      const regionName = specie[0].location;
      if (sex === 'both') {
        const animals = specie.map(mapFunction);
        mapObject[regionName] = animals;
      } else {
        const animals = specie.map((animal) => mapFunction(animal, sex));
        mapObject[regionName] = animals;
      }
    });
  return mapObject;
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

const includeAndSort = (sex) => {
  if (sex !== 'both') return mapAnimalRegions(getAnimalsBySexSorted, sex);
  return mapAnimalRegions(getAnimalSorted);
};

function getAnimalMap(options = 'none') {
  const { includeNames = false, sorted = false, sex = 'both' } = options;
  if (includeNames && sorted) return includeAndSort(sex);
  if (includeNames) {
    return (sex !== 'both')
      ? mapAnimalRegions(getAnimalsBySex, sex) : mapAnimalRegions(getAnimalNamesOnly);
  }
  return mapAnimalRegions(getAnimalsByRegion);
}

module.exports = getAnimalMap;
