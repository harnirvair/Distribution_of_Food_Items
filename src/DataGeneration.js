import { foodItems } from "./Constants";
var {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals
} = require("unique-names-generator");

const cities = [
  "Delhi",
  "Tamil Nadu",
  "Maharashtra",
  "Karnataka",
  "Uttar Pradesh",
  "Gujarat",
  "Rajasthan"
];

const getRandomValue = range => {
  return Math.floor(Math.random() * range);
};

export const DataGenerationFoodItems = () => {
  let data = [];
  let iterations = 1000;
  while (iterations > 0) {
    const foodItemIndex = Math.min(
      getRandomValue(foodItems.length),
      foodItems.length - 1
    );
    const name = foodItems[foodItemIndex].name;
    const cityIndex = Math.min(
      getRandomValue(cities.length),
      cities.length - 1
    );
    const city = cities[cityIndex];
    const quantity = Math.max(getRandomValue(100), 1);
    const calories = foodItems[foodItemIndex].calPerKg * quantity;
    data.push({
      name: name,
      location: city,
      quantity: quantity.toString(),
      calories: calories
    });
    iterations -= 1;
  }
  return data;
};

export const DataGenerationEvacuationCenters = () => {
  let data = [];
  let iterations = 25;
  while (iterations > 0) {
    const name = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals]
    });
    const cityIndex = Math.min(
      getRandomValue(cities.length),
      cities.length - 1
    );
    const city = cities[cityIndex];
    const population = Math.max(getRandomValue(10000), 1000);
    const caloriesReqd = population * 2000;
    data.push({
      name: name,
      location: city,
      population: population.toString(),
      caloriesReqd: caloriesReqd
    });
    iterations -= 1;
  }
  return data;
};
