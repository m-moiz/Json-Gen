import { names } from "./names";

export const RandomGenerator = {
  generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  generateRandomFloat(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  },

  generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  generateRandomText(length) {
    const loremIpsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += loremIpsum + " ";
    }
    return result.trim();
  },

  generateRandomSentence(sentenceLength) {
    const subjects = ["I", "You", "He", "She", "We", "They"];
    const verbs = ["run", "walk", "jump", "eat", "drink", "sleep"];
    const objects = ["a dog", "an apple", "a book", "a car", "a bird", "a cat"];
    const adverbs = [
      "quickly",
      "slowly",
      "gracefully",
      "happily",
      "hungrily",
      "sleepily",
    ];
    const adjectives = ["big", "small", "happy", "sad", "green", "blue"];

    const templates = [
      `{subject} {verb} {adverb} {object}.`,
      `{subject} {verb} {object} with {adjective} {object2}.`,
      `{subject} {verb} {adjective} {object}.`,
      `{subject} {verb} {adverb} {adjective} {object}.`,
      `{subject} {verb} {adjective} {object} and {adverb} {verb} {object2}.`,
    ];

    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const object = objects[Math.floor(Math.random() * objects.length)];
    const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const object2 = objects[Math.floor(Math.random() * objects.length)];

    const template = templates[Math.floor(Math.random() * templates.length)];

    return template
      .replace("{subject}", subject)
      .replace("{verb}", verb)
      .replace("{object}", object)
      .replace("{adverb}", adverb)
      .replace("{adjective}", adjective)
      .replace("{object2}", object2);
  },

  generateRandomEmail() {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${this.generateRandomName()}.${this.generateRandomName()}@${domain}`;
  },

  generateRandomName() {
    return names[Math.floor(Math.random() * names.length)];
  },

  generateRandomDate(year1, year2) {
    const date = new Date(
      this.generateRandomInt(year1, year2),
      this.generateRandomInt(0, 11),
      this.generateRandomInt(1, 28)
    );
    return date.toISOString().split("T")[0];
  },

  generateRandomBoolean() {
    return Math.random() >= 0.5;
  },

  generateRandomGUID() {
    return (
      this.generateRandomString(8) +
      "-" +
      this.generateRandomString(4) +
      "-" +
      this.generateRandomString(4) +
      "-" +
      this.generateRandomString(4) +
      "-" +
      this.generateRandomString(12)
    );
  },

  generateRandomColor() {
    return `#${this.generateRandomString(6).toUpperCase()}`;
  },

  generateRandomAddress() {
    return `${this.generateRandomInt(
      1,
      1000
    )} ${this.generateRandomName()} St.`;
  },

  generateRandomLatitude() {
    return this.generateRandomFloat(-90, 90);
  },

  generateRandomLongitude() {
    return this.generateRandomFloat(-180, 180);
  },

  generateRandomIPV4() {
    return `${this.generateRandomInt(0, 255)}.${this.generateRandomInt(
      0,
      255
    )}.${this.generateRandomInt(0, 255)}.${this.generateRandomInt(0, 255)}`;
  },

  generateRandomIPV6() {
    return `${this.generateRandomString(4)}:${this.generateRandomString(
      4
    )}:${this.generateRandomString(4)}:${this.generateRandomString(
      4
    )}:${this.generateRandomString(4)}:${this.generateRandomString(
      4
    )}:${this.generateRandomString(4)}:${this.generateRandomString(4)}`;
  },

  generateRandomURL() {
    return `https://${this.generateRandomString(10)}.com`;
  },

  generateRandomTime() {
    return `${this.generateRandomInt(0, 23)}:${this.generateRandomInt(
      0,
      59
    )}:${this.generateRandomInt(0, 59)}`;
  },

  generateRandomPhoneNumber() {
    return `${this.generateRandomInt(0, 999)}-${this.generateRandomInt(
      0,
      999
    )}-${this.generateRandomInt(0, 9999)}`;
  },
};
