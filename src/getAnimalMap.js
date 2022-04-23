const data = require('../data/zoo_data');

const locations = ['NE', 'NW', 'SE', 'SW'];
const getSpeciesByLocation = (location) => (
  data.species.filter((s) => s.location === location)
);

const getAnimalsByLocation = () => (
  Object.fromEntries(locations.map((l) => (
    [l, getSpeciesByLocation(l).map((s) => s.name)]
  )))
);

const getAnimalsByName = (sorted, sex = '') => (
  Object.fromEntries(locations.map((l) => {
    const speciesObj = getSpeciesByLocation(l).map(({ name, residents }) => {
      const residentsNames = residents
        .filter((r) => (sex === '' ? true : r.sex === sex))
        .map((r) => r.name);
      if (sorted) residentsNames.sort();
      return { [name]: residentsNames };
    });
    return [l, speciesObj];
  }))
);

function getAnimalMap({ includeNames, sorted, sex } = {}) {
  if (includeNames) return getAnimalsByName(sorted, sex);
  return getAnimalsByLocation();
}

module.exports = getAnimalMap;
