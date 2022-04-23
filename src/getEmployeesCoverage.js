const { employees, species } = require('../data/zoo_data');

const getEmployee = (info) => (
  employees.find((e) => e.firstName === info || e.lastName === info || e.id === info)
);

const getSpecieById = (specie) => species.find((s) => s.id === specie);

const getEmployeeObj = (employee) => ({
  id: employee.id,
  fullName: `${employee.firstName} ${employee.lastName}`,
  species: employee.responsibleFor.map((specie) => getSpecieById(specie).name),
  locations: employee.responsibleFor.map((specie) => getSpecieById(specie).location),
});

function getEmployeesCoverage({ name, id } = {}) {
  const info = name || id;
  const employee = getEmployee(info);

  if (!name && !id) return employees.map((e) => getEmployeeObj(e));
  if (!employee) throw new Error('Informações inválidas');
  return getEmployeeObj(employee);
}

module.exports = getEmployeesCoverage;
