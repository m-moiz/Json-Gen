export const schema = {
  howtoUse:
    "This is a schema for your data. You can use the Random function to add randomness to the data. You can also use Increment and Decrement functions to differentiate the data. When you are done, enter in the amout of objects you would like to create and hit generate",
  name: "An Example of the Random function being used: Random(name) Increment(1)",
  age: 32,
  email: "Random(email)",
  birthday: "Random(date, 1970, 2022)",
  address: {
    street: "Random(address)",
    city: "Random(string, 1, 2)",
    state: "CA",
    zip: "12345",
  },
  number: "Random(int, 100, 999)-Random(int, 100, 999)-Random(int, 1000, 9999)",

  all_available_random_functions:
    "These are all the random functions that you can use:",
  how_to_create_random_integers:
    "Random(int, min, max) Generates an int between min and max",
  how_to_create_random_strings:
    "Random(string, length, amount) Generates a string with the specified length (amount times)",
  how_to_create_random_dates:
    "Random(date, year1, year2) Generates a date between year1 and year2",
  how_to_create_random_text: "Random(text) Generates lorem ipsum text",
  how_to_create_random_bool: "Random(bool) Generates a bool",
  how_to_create_random_name: "Random(name) Generates a name",
  how_to_create_random_emails: "Random(email) Generates a email",
  how_to_create_random_adresses: "Random(address) Generates an address",
};
