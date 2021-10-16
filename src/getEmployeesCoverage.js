const data = require('../data/zoo_data');

const { species, employees } = data;

const checkValidInfo = (info) => {
  const allFNames = employees.map((employee) => employee.firstName);
  const allLNames = employees.map((employee) => employee.lastName);
  const allIds = employees.map((employee) => employee.id);
  if (allFNames.includes(info) || allLNames.includes(info) || allIds.includes(info)) return true;
  return false;
};
const getEmployeeByInfo = (info) => employees.find((employee) => {
  const { firstName, lastName, id } = employee;
  return (firstName === info || lastName === info || id === info);
});
const getSpecies = (ids) => ids.map((id) => {
  const animal = species.find((specie) => specie.id === id);
  return animal.name;
});
const getLocations = (animalNames) => animalNames.map((anim) => {
  const animal = species.find((specie) => specie.name === anim);
  return animal.location;
});

const getAllCoverages = () => employees.map((employee) => {
  const { id, firstName, lastName, responsibleFor } = employee;
  const fullName = `${firstName} ${lastName}`;
  return {
    id,
    fullName,
    species: getSpecies(responsibleFor),
    locations: getLocations(getSpecies(responsibleFor)),
  };
});

function getEmployeesCoverage(options = 'none') {
  const info = Object.values(options).join('');
  if (options === 'none') return getAllCoverages();
  if (!checkValidInfo(info)) throw new Error('Informações inválidas');
  const employee = getEmployeeByInfo(info);
  const { id, firstName, lastName, responsibleFor } = employee;
  const fullName = `${firstName} ${lastName}`;
  return {
    id,
    fullName,
    species: getSpecies(responsibleFor),
    locations: getLocations(getSpecies(responsibleFor)),
  };
}

module.exports = getEmployeesCoverage;
