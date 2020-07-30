import React from "react";
import Pair from "./Pair";

const THRESHOLD = 0.2;

const getIndexOfARandomElement = array => {
  const pos = Math.floor(Math.random() * array.length);
  return pos;
};

const AllocateItems = () => {
  const unpairedItems = localStorage.getItem("items");
  const unpairedCenters = localStorage.getItem("centers");

  let currenPopulation = [];
  while (unpairedCenters.length > 0) {
    let centerIndex = getIndexOfARandomElement(unpairedCenters);
    let center = unpairedCenters[centerIndex];
    unpairedCenters.splice(centerIndex, 1);

    let availableCalories = unpairedItems.reduce(
      (total, item) => total + item.calories
    );
    let caloriesNeeded = center.caloriesReqd;
    let allocatedItems = [];
    if (availableCalories >= caloriesNeeded) {
      while (caloriesNeeded > 0) {
        let itemIndex = getIndexOfARandomElement(unpairedItems);
        let item = unpairedItems[itemIndex];
        unpairedItems.splice(itemIndex, 1);

        allocatedItems.push(item);
        caloriesNeeded -= item.calories;
      }
    }
    currenPopulation.push(Pair(center, allocatedItems));
  }

  let currentPopulationCopy = currenPopulation;
  currentPopulationCopy.forEach(element => {
    let pairIndex = getIndexOfARandomElement(currenPopulation);
    let pair = currenPopulation[pairIndex];
    if (pair.fitnessScore < THRESHOLD) {
      currenPopulation.splice(pairIndex, 1);
      unpairedCenters.push(pair.center);
      pair.allocatedItems.forEach(item => {
        unpairedItems.push(item);
      });
    }
  });

  let crossoverIterations = 10000;
  while (
    crossoverIterations > 0 &&
    unpairedCenters.length > 0 &&
    currenPopulation.length > 0
  ) {
    let pairIndex = getIndexOfARandomElement(currenPopulation);
    let pair = currenPopulation[pairIndex];
    currenPopulation.splice(pairIndex, 1);

    // let firstPeronIndex = getIndexOfARandomElement(unpairedPeople);
    // let firstPerson = unpairedPeople[firstPeronIndex];
    // unpairedPeople.splice(firstPeronIndex, 1);

    // let secondPersonIndex = getIndexOfARandomElement(unpairedPeople);
    // let secondPerson = unpairedPeople[secondPersonIndex];
    // unpairedPeople.splice(secondPersonIndex, 1);

    // let firstNewPair = Pair(firstPerson, pair[PERSON_2]);
    // let secondNewPair = Pair(secondPerson, pair[PERSON_1]);

    // if (
    //   firstNewPair[FITNESS_SCORE] > THRESHOLD &&
    //   secondNewPair[FITNESS_SCORE] > THRESHOLD
    // ) {
    //   currentPopulation.push(firstNewPair);
    //   currentPopulation.push(secondNewPair);
    // } else if (firstNewPair[FITNESS_SCORE] > THRESHOLD) {
    //   currentPopulation.push(firstNewPair);
    //   unpairedPeople.push(secondPerson);
    //   unpairedPeople.push(pair[PERSON_1]);
    // } else if (secondNewPair[FITNESS_SCORE] > THRESHOLD) {
    //   currentPopulation.push(secondNewPair);
    //   unpairedPeople.push(firstPerson);
    //   unpairedPeople.push(pair[PERSON_2]);
    // } else {
    //   currentPopulation.push(pair);
    //   unpairedPeople.push(firstPerson);
    //   unpairedPeople.push(secondPerson);
    // }

    crossoverIterations -= 1;
  }
};
