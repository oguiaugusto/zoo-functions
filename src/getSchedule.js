const data = require('../data/zoo_data');

const weekDays = Object.keys(data.hours);
const species = data.species.map(({ name }) => name);

const getAnimalsByDay = (day) => (
  data.species.reduce((acc, s) => (
    s.availability.includes(day) ? [...acc, s.name] : acc
  ), [])
);

const getOfficeHour = (day) => {
  const { open, close } = data.hours[day];
  return `Open from ${open}am until ${close}pm`;
};

const getDaySchedule = (day) => (day === 'Monday' ? ({
  [day]: { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' },
}) : ({
  [day]: { officeHour: getOfficeHour(day), exhibition: getAnimalsByDay(day) },
}));

function getSchedule(scheduleTarget) {
  if (species.includes(scheduleTarget)) {
    return data.species.find((s) => s.name === scheduleTarget).availability;
  }
  if (weekDays.includes(scheduleTarget)) return getDaySchedule(scheduleTarget);
  return weekDays
    .map((day) => Object.entries(getDaySchedule(day))[0])
    .reduce((acc, sch, i) => ({ ...acc, [sch[0]]: sch[1] }), {});
}

module.exports = getSchedule;
