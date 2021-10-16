const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const child = entrants.filter((entrant) => entrant.age < 18);
  const adult = entrants.filter((entrant) => entrant.age >= 18 && entrant.age < 50);
  const senior = entrants.filter((entrant) => entrant.age >= 50);
  return { adult: adult.length, senior: senior.length, child: child.length };
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length < 1) return 0;
  const entries = Object.values(countEntrants(entrants));
  const prices = Object.values(data.prices);
  return prices.reduce((acc, price, index) => {
    const person = entries[index];
    return acc + price * person;
  }, 0);
}

module.exports = { calculateEntry, countEntrants };
