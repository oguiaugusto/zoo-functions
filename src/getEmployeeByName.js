const { employees } = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  const employee = employees.find(({ firstName, lastName }) => (
    firstName === employeeName || lastName === employeeName
  ));
  return employee || {};
}

module.exports = getEmployeeByName;
