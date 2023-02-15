import { RandomGenerator } from "../lib/randomGenerator";

it("should return a random integer between 1 and 10", () => {
  const randomInt = RandomGenerator.generateRandomInt(1, 10);
  expect(randomInt).toBeGreaterThanOrEqual(1);
  expect(randomInt).toBeLessThanOrEqual(10);
});

it("should return a random string of length 10", () => {
  const randomString = RandomGenerator.generateRandomString(10);
  expect(randomString.length).toBe(10);
});

it("should return a random floating number between 1 and 10 with 2 decimal places", () => {
  const isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
  };
  const randomFloat = RandomGenerator.generateRandomFloat(1, 10);
  expect(randomFloat).toBeGreaterThanOrEqual(1);
  expect(randomFloat).toBeLessThanOrEqual(10);
  console.log(randomFloat);
  expect(isFloat(randomFloat)).toBe(true);
});

it("should return a random boolean value", () => {
  const randomBoolean = RandomGenerator.generateRandomBoolean();
  expect(typeof randomBoolean == "boolean").toBe(true);
});

it("should return a random GUID", () => {
  const randomGUID = RandomGenerator.generateRandomGUID();
  expect(randomGUID).toMatch(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  );
});

it("should return a random color", () => {
  const randomColor = RandomGenerator.generateRandomColor();
  expect(randomColor).toMatch(/#[0-9A-F]{6}/);
});

it("should return a random address", () => {
  const randomAddress = RandomGenerator.generateRandomAddress();
  expect(randomAddress).toMatch(/[0-9]{1,4} [a-z]{1,10} St./);
});

it("should return a random latitude", () => {
  const randomLatitude = RandomGenerator.generateRandomLatitude();
  expect(randomLatitude).toBeGreaterThanOrEqual(-90);
  expect(randomLatitude).toBeLessThanOrEqual(90);
});

it("should return a random longitude", () => {
  const randomLongitude = RandomGenerator.generateRandomLongitude();
  expect(randomLongitude).toBeGreaterThanOrEqual(-180);
  expect(randomLongitude).toBeLessThanOrEqual(180);
});

it("should return a random IPV4 address", () => {
  const randomIPV4 = RandomGenerator.generateRandomIPV4();
  expect(randomIPV4).toMatch(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/);
});

it("should return a random IPV6 address", () => {
  const randomIPV6 = RandomGenerator.generateRandomIPV6();
});

it("should return a random URL", () => {
  const randomURL = RandomGenerator.generateRandomURL();
  expect(randomURL).toMatch(/https?:\/\/[a-z0-9]{1,10}\.[a-z]{1,10}\.com/);
});

it("should return a random phone number", () => {
  const randomPhone = RandomGenerator.generateRandomPhoneNumber();
  expect(randomPhone).toMatch(/[0-9]{3}-[0-9]{3}-[0-9]{4}/);
});
