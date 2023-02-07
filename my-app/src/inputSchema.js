export const schema = {
  name: "Random(name) Increment(1)",
  age: 32,
  email: "Random(email)",
  birthday: "Random(date, 1970, 2022)",
  address: {
    street: "Random(address)",
    city: "Random(string, 1, 2)",
    state: "CA",
    zip: "12345",
  },
  phone: [
    {
      type: "home",
      number:
        "Random(int, 100, 999)-Random(int, 100, 999)-Random(int, 1000, 9999)",
    },
    {
      type: "cell",
      number:
        "Random(int, 100, 999)-Random(int, 100, 999)-Random(int, 1000, 9999)",
    },
  ],
};
