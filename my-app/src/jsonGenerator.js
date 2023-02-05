const randomIntPattern = /Random\(int, (\d+), (\d+)\)/g;
const randomFloatPattern = /Random\(float, (\d+), (\d+)\)/g;
const randomStringPattern = /Random\(string, (\d+), (\d+)\)/g;
const randomTextPattern = /Random\(text, (\d+)\)/g;
const incrementPattern = /Increment\((\d+)\)/g;
const DecrementPattern = /Decrement\((\d+)\)/g;

export const objectValueCalc = (value, count) => {
  console.log(value);
  let objectValue = value;

  if (typeof objectValue === "string") {
    objectValue = replaceIfMatchRandomInt(objectValue, randomIntPattern);

    objectValue = replaceIfMatchRandomFloat(objectValue, randomFloatPattern);

    objectValue = objectValue.replace(incrementPattern, (match, p1) => {
      return parseInt(p1) + count;
    });

    objectValue = objectValue.replace(DecrementPattern, (match, p1) => {
      return parseInt(p1) - count;
    });

    objectValue = replaceIfMatchRandomString(objectValue, randomStringPattern);

    objectValue = replaceIfMatchRandomText(objectValue, randomTextPattern);
  } else if (typeof objectValue === "object") {
    for (const key in objectValue) {
      objectValue[key] = objectValueCalc(objectValue[key], count);
    }
  } else if (typeof objectValue === "array") {
    for (let i = 0; i < objectValue.length; i++) {
      objectValue[i] = objectValueCalc(objectValue[i], count);
    }
  }

  return objectValue;
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getRandomText = (length) => {
  const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += loremIpsum + " ";
  }
  return result.trim();
};

export const replaceIfMatchRandomText = (input, pattern) => {
  return input.replace(pattern, (match, p1) => {
    return getRandomText(parseInt(p1));
  });
};

export const replaceIfMatchRandomFloat = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return getRandomFloat(parseInt(p1), parseInt(p2));
  });
};

export const replaceIfMatchRandomInt = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    return getRandomInt(parseInt(p1), parseInt(p2));
  });
};

export const replaceIfMatchRandomString = (input, pattern) => {
  return input.replace(pattern, (match, p1, p2) => {
    let strings = "";
    for (let i = 0; i < parseInt(p2); i++) {
      strings += getRandomString(parseInt(p1)) + "-";
    }
    return strings.slice(0, -1);
  });
};

export function jsonCreator(schema, numberOfObjects) {
  const jsonData = schema;
  const json = [];
  let count = 0;
  console.log("start", jsonData);
  for (let i = 0; i < numberOfObjects; i++) {
    let object = {};
    for (const key in jsonData) {
      object[key] = objectValueCalc(jsonData[key], count);
    }
    json.push(object);
    count++;
  }
  console.log("end");

  return json;
}
