const { species } = require('../data/zoo_data');

const allAnimals = () =>
  species.reduce((acc, { name, residents }, index) => (
    (index === 0) ? ({ [name]: residents.length }) : ({ ...acc, [name]: residents.length })
  ), '');

function countAnimals(animal) {
  if (!animal) return allAnimals();

  const { specie, sex = 'both' } = animal;
  const { residents } = species.find((anim) => anim.name === specie);
  const amount = residents.reduce((acc, resident) => {
    if (sex === 'both') return acc + 1;
    return (resident.sex === sex) ? acc + 1 : acc;
  }, 0);
  return amount;
}

module.exports = countAnimals;
