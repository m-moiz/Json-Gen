import { RandomGenerator } from "./randomGenerator";

const randomPattern = /Random\((\w+),? ?(\d+)?,? ?(\d+)?\)/g;
const incrementPattern = /Increment\((\d+)\)/g;
const decrementPattern = /Decrement\((\d+)\)/g;

export const valueCalc = (value, count) => {
  if (typeof value === "string") {
    value = replaceIfMatch(value);
    value = value.replace(incrementPattern, (match, p1) => {
      return parseInt(p1) + count;
    });
    value = value.replace(decrementPattern, (match, p1) => {
      return parseInt(p1) - count;
    });
    // The value could be an object so recurse for each property
  } else if (typeof value === "object" && !Array.isArray(value)) {
    const newValue = {};
    for (const key in value) {
      newValue[key] = valueCalc(value[key], count);
    }
    value = newValue;
  } else if (Array.isArray(value)) {
    const newValue = [];
    for (let i = 0; i < value.length; i++) {
      newValue[i] = valueCalc(value[i], count);
    }
    value = newValue;
  }

  return value;
};

const replaceIfMatch = (input) => {
  return input.replace(randomPattern, (match, p1, p2, p3) => {
    switch (p1) {
      case "int":
        return RandomGenerator.generateRandomInt(p2, p3);
      case "float":
        return RandomGenerator.generateRandomFloat(p2, p3);
      case "string":
        return RandomGenerator.generateRandomString(p2, p3);
      case "text":
        return RandomGenerator.generateRandomText(p2);
      case "sentence":
        return RandomGenerator.generateRandomSentence(p2);
      case "email":
        return RandomGenerator.generateRandomEmail();
      case "name":
        return RandomGenerator.generateRandomName();
      case "address":
        return RandomGenerator.generateRandomAddress();
      case "bool":
        return RandomGenerator.generateRandomBoolean();
      case "date":
        return RandomGenerator.generateRandomDate(p2, p3);
      case "time":
        return RandomGenerator.generateRandomTime();
      case "latitude":
        return RandomGenerator.generateRandomLatitude();
      case "longitude":
        return RandomGenerator.generateRandomLongitude();
      case "guid":
        return RandomGenerator.generateRandomGUID();
      case "ipv4":
        return RandomGenerator.generateRandomIPV4();
      case "ipv6":
        return RandomGenerator.generateRandomIPV6();
      case "color":
        return RandomGenerator.generateRandomColor();
      default:
        return match;
    }
  });
};

export function jsonCreator(schema, numberOfObjects) {
  if (!schema || Object.keys(schema).length === 0 || numberOfObjects <= 0)
    return null;
  const jsonData = schema;
  const json = [];
  let count = 0;
  for (let i = 0; i < numberOfObjects; i++) {
    let object = {};
    for (const key in jsonData) {
      object[key] = valueCalc(jsonData[key], count);
    }
    json.push(object);
    count++;
  }

  return json;
}
