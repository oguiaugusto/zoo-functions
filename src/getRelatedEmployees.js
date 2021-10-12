const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  const relatedE = employees
    .filter((emp) => emp.managers.includes(managerId))
    .map((emp) => `${emp.firstName} ${emp.lastName}`);
  return relatedE;
}

module.exports = { isManager, getRelatedEmployees };
