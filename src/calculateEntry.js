const { prices } = require('../data/zoo_data');

function countEntrants(entrants) {
  return {
    child: entrants.filter(({ age }) => age < 18).length,
    adult: entrants.filter(({ age }) => age >= 18 && age < 50).length,
    senior: entrants.filter(({ age }) => age >= 50).length,
  };
}

function calculateEntry(entrants) {
  if (!entrants || entrants.length === 0 || !Array.isArray(entrants)) return 0;

  const entries = countEntrants(entrants);
  return Object
    .entries(entries)
    .reduce((acc, [person, amount]) => (acc + (prices[person] * amount)), 0);
}

module.exports = { calculateEntry, countEntrants };
