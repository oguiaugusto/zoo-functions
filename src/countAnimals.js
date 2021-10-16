const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const allAnimals = () =>
  species.reduce((acc, specie, index) => {
    const { name, residents } = specie;
    if (index === 0) return { [name]: residents.length };
    return { ...acc, [name]: residents.length };
  }, '');

function countAnimals(animal = 'all') {
  if (animal === 'all') return allAnimals();
  const { specie, sex = 'both' } = animal;
  const specieInfo = species.find((anim) => anim.name === specie);
  const specieResidents = specieInfo.residents;
  const amount = specieResidents.reduce((acc, resident) => {
    if (sex === 'both') return acc + 1;
    return (resident.sex === sex) ? acc + 1 : acc;
  }, 0);
  return amount;
}

module.exports = countAnimals;
