import { RandomGenerator } from "./randomGenerator";

const randomPattern = /Random\((\w+),? ?(\d+)?,? ?(\d+)?\)/g;
const incrementPattern = /Increment\((\d+)\)/g;
const DecrementPattern = /Decrement\((\d+)\)/g;

export const objectValueCalc = (value, count) => {
  let objectValue = value;

  if (typeof objectValue === "string") {
    objectValue = replaceIfMatch(objectValue);
    objectValue = objectValue.replace(incrementPattern, (match, p1) => {
      return parseInt(p1) + count;
    });
    objectValue = objectValue.replace(DecrementPattern, (match, p1) => {
      return parseInt(p1) - count;
    });
  } else if (typeof objectValue === "object" && !Array.isArray(objectValue)) {
    const newObjectValue = {};
    for (const key in objectValue) {
      newObjectValue[key] = objectValueCalc(objectValue[key], count);
    }
    objectValue = newObjectValue;
  } else if (Array.isArray(objectValue)) {
    const newObjectValue = [];
    for (let i = 0; i < objectValue.length; i++) {
      newObjectValue[i] = objectValueCalc(objectValue[i], count);
    }
    objectValue = newObjectValue;
  }

  return objectValue;
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
        return RandomGenerator.generateRandomBool();
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
      object[key] = objectValueCalc(jsonData[key], count);
    }
    json.push(object);
    count++;
  }

  return json;
}
