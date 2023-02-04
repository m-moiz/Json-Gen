const randomIntPattern = /Random\(int, (\d+), (\d+)\)/g;
const randomFloatPattern = /Random\(float, (\d+), (\d+)\)/g;
const randomStringPattern = /Random\(string, (\d+), (\d+)\)/g;
const randomTextPattern = /Random\(text, (\d+)\)/g;
const incrementPattern = /Increment\((\d+)\)/g;
const DecrementPattern = /Decrement\((\d+)\)/g;

const fs = require("fs");

const objectValueCalc = (value, count) => {
  let objectValue = value;

  if (typeof objectValue === "string") {
    objectValue = replaceIfMatchRandomInt(objectValue);

    objectValue = replaceIfMatchRandomFloat(objectValue);

    objectValue = objectValue.replace(incrementPattern, (match, p1) => {
      return parseInt(p1) + count;
    });

    objectValue = objectValue.replace(DecrementPattern, (match, p1) => {
      return parseInt(p1) - count;
    });

    objectValue = replaceIfMatchRandomString(objectValue);

    objectValue = replaceIfMatchRandomText(objectValue);
  }

  return objectValue;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getRandomText = (length) => {
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += loremIpsum + " ";
  }
  return result.trim();
};

const replaceIfMatchRandomText = (input) => {
  return input.replace(randomTextPattern, (match, p1) => {
    return getRandomText(parseInt(p1));
  });
};

const replaceIfMatchRandomFloat = (input) => {
  return input.replace(randomFloatPattern, (match, p1, p2) => {
    return getRandomInt(parseInt(p1), parseInt(p2));
  });
};

const replaceIfMatchRandomInt = (input) => {
  return input.replace(randomIntPattern, (match, p1, p2) => {
    return getRandomInt(parseInt(p1), parseInt(p2));
  });
};

const replaceIfMatchRandomString = (input) => {
  return input.replace(randomStringPattern, (match, p1, p2) => {
    let strings = "";
    for (let i = 0; i < parseInt(p2); i++) {
      strings += getRandomString(parseInt(p1)) + "-";
    }
    return strings.slice(0, -1);
  });
};

const jsonCreator = (numberOfObjects, filepath) => {
  const file = fs.readFileSync(filepath);
  const jsonData = JSON.parse(file);
  const json = [];
  let count = 0;
  for (let i = 0; i < numberOfObjects; i++) {
    let object = {};
    for (key in jsonData) {
      object[key] = objectValueCalc(jsonData[key], count);
    }
    json.push(object);
    count++;
  }

  return json;
};

console.log(jsonCreator(5, "input.json"));
