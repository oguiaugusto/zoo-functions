const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  const employee = employees.find((emp) => {
    const firstN = emp.firstName;
    const lastN = emp.lastName;
    return (firstN === employeeName || lastN === employeeName);
  });
  return (employee !== undefined) ? employee : {};
}

module.exports = getEmployeeByName;
