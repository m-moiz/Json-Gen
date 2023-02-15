import { jsonCreator } from "../lib/jsonGenerator";

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
  expect(parseInt(jsonOutput[0].phone[0].number.split("-")[0])).not.toEqual(
    parseInt(jsonOutput[1].phone[0].number.split("-")[0])
  );
});

it("should return null when it receives an empty schema/object", () => {
  const schema = {};
  const numberOfObjects = 1;
  const jsonOutput = jsonCreator(schema, numberOfObjects);
  expect(jsonOutput).toEqual(null);
});

it("should return null when it receives 0 number of objects", () => {
  const schema = {
    name: "John Doe",
  };
  const numberOfObjects = 0;
  const jsonOutput = jsonCreator(schema, numberOfObjects);
  expect(jsonOutput).toEqual(null);
});

it("should return null when it receives negative number of objects", () => {
  const schema = {
    name: "John Doe",
  };
  const numberOfObjects = -20;
  const jsonOutput = jsonCreator(schema, numberOfObjects);
  expect(jsonOutput).toEqual(null);
});

it("should run without errors when it receives a schema with a nested array", () => {
  const schema = {
    nestedArray: [
      {
        phone: [
          {
            number: "Random(int, 100, 253)-456-7890",
          },
          {
            number: "Random(int, 100, 253)-456-7890",
          },
        ],
      },
    ],
  };
  const numberOfObjects = 1;

  const jsonOutput = jsonCreator(schema, numberOfObjects);
  expect(jsonOutput).not.toEqual(null);
});

it("should run in a reasonable time when it receives a schema with a nested array", () => {
  const schema = {
    nestedArray: [
      {
        phone: [
          {
            number: "Random(int, 100, 253)-456-7890",
          },
          {
            number: "Random(int, 100, 253)-456-7890",
          },
        ],
      },
    ],
  };

  function clock(start) {
    if (!start) return process.hrtime();
    var end = process.hrtime(start);
    return Math.round(end[0] * 1000 + end[1] / 1000000);
  }

  const numberOfObjects = 10000;
  var start = clock();
  const jsonOutput = jsonCreator(schema, numberOfObjects);
  var duration = clock(start);
  expect(duration).toBeLessThan(500);
});
