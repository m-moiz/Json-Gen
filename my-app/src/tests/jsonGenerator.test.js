import { getRandomInt, jsonCreator } from "../jsonGenerator";

it("should return a random integer between 1 and 10", () => {
  const randomInt = getRandomInt(1, 10);
  expect(randomInt).toBeGreaterThanOrEqual(1);
  expect(randomInt).toBeLessThanOrEqual(10);
});

it("should return an object with a age value between 1 and 100", () => {
  const schema = {
    name: "John Doe",
    age: "Random(int, 1, 100)",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    phone: [
      {
        type: "home",
        number: "123-456-7890",
      },
      {
        type: "cell",
        number: "123-456-7890",
      },
    ],
  };
  const numberOfObjects = 1;
  const jsonOutput = jsonCreator(schema, numberOfObjects);
  expect(parseInt(jsonOutput[0].age)).toBeGreaterThanOrEqual(1);
  expect(parseInt(jsonOutput[0].age)).toBeLessThanOrEqual(100);
});

it("should return an object with the first phone number digits between 100 and 253", () => {
  const schema = {
    name: "John Doe",
    age: "Random(int, 1, 100)",
    address: {
      street: "Random(string, 1, 5)",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    phone: [
      {
        type: "home",
        number: "Random(int, 100, 253)-456-7890",
      },
      {
        type: "cell",
        number: "Random(int, 100, 253)-456-7890",
      },
    ],
  };
  const numberOfObjects = 1;
  const jsonOutput = jsonCreator(schema, numberOfObjects);
  console.log(jsonOutput);
  expect(
    parseInt(jsonOutput[0].phone[0].number.split("-")[0])
  ).toBeGreaterThanOrEqual(100);
  expect(
    parseInt(jsonOutput[0].phone[0].number.split("-")[0])
  ).toBeLessThanOrEqual(253);
});

it("should return two objects and their first digits of phone numbers must be different", () => {
  const schema = {
    name: "John Doe",
    age: "Random(int, 1, 100)",
    address: {
      street: "Random(string, 1, 5)",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    phone: [
      {
        type: "home",
        number: "Random(int, 100, 253)-456-7890",
      },
      {
        type: "cell",
        number: "Random(int, 100, 253)-456-7890",
      },
    ],
  };
  const numberOfObjects = 2;
  const jsonOutput = jsonCreator(schema, numberOfObjects);
  console.log(jsonOutput);
  expect(parseInt(jsonOutput[0].phone[0].number.split("-")[0])).not.toEqual(
    parseInt(jsonOutput[1].phone[0].number.split("-")[0])
  );
});
