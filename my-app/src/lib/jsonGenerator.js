import { RandomGenerator } from "./randomGenerator";

const randomIntPattern = /Random\(int, (\d+), (\d+)\)/g;
const randomFloatPattern = /Random\(float, (\d+), (\d+)\)/g;
const randomStringPattern = /Random\(string, (\d+), (\d+)\)/g;
const randomTextPattern = /Random\(text, (\d+)\)/g;
const randomSentencePattern = /Random\(sentence, (\d+)\)/g;
const incrementPattern = /Increment\((\d+)\)/g;
const DecrementPattern = /Decrement\((\d+)\)/g;
const emailPattern = /Random\(email\)/g;
const namePattern = /Random\(name\)/g;
const addressPattern = /Random\(address\)/g;
const boolPattern = /Random\(bool\)/g;
const datePattern = /Random\(date, (\d+), (\d+)\)/g;
const timePattern = /Random\(time\)/g;
const cityPattern = /Random\(city, (\d+), (\d+)\)/g;
const statePattern = /Random\(state, (\d+), (\d+)\)/g;
const zipPattern = /Random\(zip, (\d+), (\d+)\)/g;
const countryPattern = /Random\(country, (\d+), (\d+)\)/g;
const latitudePattern = /Random\(latitude\)/g;
const longitudePattern = /Random\(longitude\)/g;
const guidPattern = /Random\(guid\)/g;
const ipv4Pattern = /Random\(ipv4\)/g;
const ipv6Pattern = /Random\(ipv6\)/g;
const colorPattern = /Random\(color\)/g;
const hexPattern = /Random\(hex\)/g;
const rgbPattern = /Random\(rgb\)/g;
const rgbaPattern = /Random\(rgba\)/g;
const hslPattern = /Random\(hsl\)/g;
const hslaPattern = /Random\(hsla\)/g;
const wordPattern = /Random\(word, (\d+), (\d+)\)/g;
const wordsPattern = /Random\(words, (\d+), (\d+)\)/g;
const paragraphPattern = /Random\(paragraph, (\d+), (\d+)\)/g;
const paragraphsPattern = /Random\(paragraphs, (\d+), (\d+)\)/g;
const sentencePattern = /Random\(sentence, (\d+), (\d+)\)/g;
const sentencesPattern = /Random\(sentences, (\d+), (\d+)\)/g;
const titlePattern = /Random\(title, (\d+), (\d+)\)/g;
const firstNamePattern = /Random\(firstName, (\d+), (\d+)\)/g;
const lastNamePattern = /Random\(lastName, (\d+), (\d+)\)/g;
const fullNamePattern = /Random\(fullName, (\d+), (\d+)\)/g;
const jobTitlePattern = /Random\(jobTitle, (\d+), (\d+)\)/g;
const prefixPattern = /Random\(prefix, (\d+), (\d+)\)/g;
const suffixPattern = /Random\(suffix, (\d+), (\d+)\)/g;

export const objectValueCalc = (value, count) => {
  let objectValue = value;

  if (typeof objectValue === "string") {
    objectValue = replaceIfMatchRandomInt(objectValue, randomIntPattern);
    objectValue = replaceIfMatchRandomFloat(objectValue, randomFloatPattern);
    objectValue = replaceIfMatchRandomSentence(
      objectValue,
      randomSentencePattern
    );
    objectValue = objectValue.replace(incrementPattern, (match, p1) => {
      return parseInt(p1) + count;
    });
    objectValue = objectValue.replace(DecrementPattern, (match, p1) => {
      return parseInt(p1) - count;
    });
    objectValue = replaceIfMatchRandomString(objectValue, randomStringPattern);
    objectValue = replaceIfMatchRandomText(objectValue, randomTextPattern);
    objectValue = replaceIfMatchRandomEmail(objectValue, emailPattern);
    objectValue = replaceIfMatchRandomName(objectValue, namePattern);
    objectValue = replaceIfMatchRandomAddress(objectValue, addressPattern);
    objectValue = replaceIfMatchRandomDate(objectValue, datePattern);
    objectValue = replaceIfMatchRandomTime(objectValue, timePattern);
    objectValue = replaceIfMatchRandomBoolean(objectValue, boolPattern);
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

const replaceIfMatchRandomEmail = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return RandomGenerator.generateRandomEmail(p1, p2);
  });
};

const replaceIfMatchRandomName = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return RandomGenerator.generateRandomName(p1, p2);
  });
};

const replaceIfMatchRandomAddress = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return RandomGenerator.generateRandomAddress(p1, p2);
  });
};

const replaceIfMatchRandomDate = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return RandomGenerator.generateRandomDate(p1, p2);
  });
};

const replaceIfMatchRandomTime = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return RandomGenerator.generateRandomTime(p1, p2);
  });
};

const replaceIfMatchRandomBoolean = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return RandomGenerator.generateRandomBoolean();
  });
};

const replaceIfMatchRandomColor = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return RandomGenerator.generateRandomColor();
  });
};

const replaceIfMatchRandomSentence = (input, pattern) => {
  return input.replace(pattern, (match, p1) => {
    return RandomGenerator.generateRandomSentence(p1);
  });
};

const replaceIfMatchRandomText = (input, pattern) => {
  return input.replace(pattern, (match, p1) => {
    return RandomGenerator.generateRandomText(parseInt(p1));
  });
};

const replaceIfMatchRandomFloat = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return RandomGenerator.generateRandomFloat(parseInt(p1), parseInt(p2));
  });
};

const replaceIfMatchRandomInt = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return RandomGenerator.generateRandomInt(parseInt(p1), parseInt(p2));
  });
};

const replaceIfMatchRandomString = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    let strings = "";
    for (let i = 0; i < parseInt(p2); i++) {
      strings += RandomGenerator.generateRandomString(parseInt(p1)) + "-";
    }
    return strings.slice(0, -1);
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
