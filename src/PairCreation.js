import Pair from "./Pair";

const THRESHOLD = 0.5;

const getIndexOfARandomElement = array => {
  const pos = Math.floor(Math.random() * array.length);
  return pos;
};

const PairCreation = () => {
  const unpairedItems = JSON.parse(localStorage.getItem("items"));
  const unpairedCenters = JSON.parse(localStorage.getItem("centers"));

  let currentPopulation = [];

  while (unpairedCenters.length > 0 && unpairedItems.length > 0) {
    let centerIndex = getIndexOfARandomElement(unpairedCenters);
    let center = unpairedCenters[centerIndex];
    unpairedCenters.splice(centerIndex, 1);

    let itemIndex = getIndexOfARandomElement(unpairedItems);
    let item = unpairedItems[itemIndex];
    unpairedItems.splice(itemIndex, 1);

    if (center.caloriesReqd > item.calories) {
      unpairedCenters.push({
        ...center,
        caloriesReqd: center.caloriesReqd - item.calories
      });
    } else if (center.caloriesReqd < item.calories) {
      unpairedItems.push({
        ...item,
        calories: item.calories - center.caloriesReqd
      });
    }

    currentPopulation.push(Pair(center, item));
  }

  let currentPopulationCopy = currentPopulation;
  currentPopulationCopy.forEach(element => {
    let pairIndex = getIndexOfARandomElement(currentPopulation);
    let pair = currentPopulation[pairIndex];
    if (pair.fitnessScore < THRESHOLD) {
      currentPopulation.splice(pairIndex, 1);
      unpairedCenters.push(pair.center);
      unpairedItems.push(pair.item);
    }
  });

  let crossoverIterations = 10000;
  while (
    crossoverIterations > 0 &&
    unpairedCenters.length > 0 &&
    unpairedItems.length > 0 &&
    currentPopulation.length > 0
  ) {
    let pairIndex = getIndexOfARandomElement(currentPopulation);
    let pair = currentPopulation[pairIndex];
    currentPopulation.splice(pairIndex, 1);

    let centerIndex = getIndexOfARandomElement(unpairedCenters);
    let center = unpairedCenters[centerIndex];
    unpairedCenters.splice(centerIndex, 1);

    let itemIndex = getIndexOfARandomElement(unpairedItems);
    let item = unpairedItems[itemIndex];
    unpairedItems.splice(itemIndex, 1);

    let firstNewPair = Pair(center, pair.item);
    let secondNewPair = Pair(pair.center, item);

    if (
      firstNewPair.fitnessScore > THRESHOLD &&
      secondNewPair.fitnessScore > THRESHOLD
    ) {
      currentPopulation.push(firstNewPair);
      currentPopulation.push(secondNewPair);
    } else if (firstNewPair.firstNewPair > THRESHOLD) {
      currentPopulation.push(firstNewPair);
      unpairedCenters.push(secondNewPair.center);
      unpairedItems.push(secondNewPair.item);
    } else if (secondNewPair.fitnessScore > THRESHOLD) {
      currentPopulation.push(secondNewPair);
      unpairedCenters.push(firstNewPair.center);
      unpairedItems.push(firstNewPair.item);
    } else {
      currentPopulation.push(pair);
      unpairedCenters.push(center);
      unpairedItems.push(item);
    }

    crossoverIterations -= 1;
  }

  let disseminationIterations = 8000;
  while (
    disseminationIterations > 0 &&
    unpairedCenters.length > 0 &&
    unpairedItems.length > 0
  ) {
    let pairsToBeDeleted = Math.max(currentPopulation.length / 5, 1);
    while (pairsToBeDeleted > 0) {
      let pairIndex = getIndexOfARandomElement(currentPopulation);
      let pair = currentPopulation[pairIndex];
      currentPopulation.splice(pairIndex, 1);

      unpairedCenters.push(pair.center);
      unpairedItems.push(pair.item);

      pairsToBeDeleted -= 1;
    }

    let innerIterations = 800;
    while (
      innerIterations > 0 &&
      unpairedCenters.length > 0 &&
      unpairedItems.length > 0
    ) {
      let centerIndex = getIndexOfARandomElement(unpairedCenters);
      let center = unpairedCenters[centerIndex];
      unpairedCenters.splice(centerIndex, 1);

      let itemIndex = getIndexOfARandomElement(unpairedItems);
      let item = unpairedItems[itemIndex];
      unpairedItems.splice(itemIndex, 1);

      let pair = Pair(center, item);
      if (pair.fitnessScore > THRESHOLD) {
        currentPopulation.push(pair);
      } else {
        unpairedCenters.push(center);
        unpairedItems.push(item);
      }
      innerIterations -= 1;
    }

    disseminationIterations -= 1;
  }

  return currentPopulation;
};

export default PairCreation;
