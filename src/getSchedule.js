const data = require('../data/zoo_data');

const { hours, species } = data;

const getExhbition = (day) => species.filter((specie) => specie.availability.includes(day))
  .map((specie) => specie.name);

const getAnimalDays = (animal) => {
  const searchAnimal = species.find((specie) => specie.name === animal);
  return searchAnimal.availability;
};
const getDaySchedule = (...allDays) => {
  const schedule = {};
  allDays.forEach((day) => {
    if (day !== 'Monday') {
      const { open, close } = hours[day];
      schedule[day] = {
        officeHour: `Open from ${open}am until ${close}pm`,
        exhibition: getExhbition(day),
      };
    } else {
      schedule[day] = {
        officeHour: 'CLOSED',
        exhibition: 'The zoo will be closed!',
      };
    }
  });
  return schedule;
};

function getSchedule(scheduleTarget = 'none') {
  const animals = species.map((specie) => specie.name);
  const weekDays = Object.keys(hours);
  if (animals.includes(scheduleTarget)) return getAnimalDays(scheduleTarget);
  if (weekDays.includes(scheduleTarget)) return getDaySchedule(scheduleTarget);
  return getDaySchedule(...weekDays);
}

module.exports = getSchedule;
