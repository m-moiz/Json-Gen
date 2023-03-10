JSON Gen is a fake json generator which is meant to be simple and flexible to use.

[Visit the app here](https://jsongen.netlify.app/)

[For step by step instructions on how to use the app, click here](https://m-moiz.github.io/Json-Gen/)

# How to use:

Enter or modify the schema of the objects that you would like to generate. For example:

```javascript
{
  "name": "John";
  "address": "200 St";
}
```

If you specify 10 in the input field in the bottom and hit generate, you will see the same object repeated 10 times.

In order to add random functionality, just add Random(type, arg1?, arg2?) - arg1 and arg2 are optional and depend on the type. For example:

```javascript
{
  "name": "Random(string, 1, 2)";
  "address": "Random(int, 100, 1000)";
}
```

`Random(int, 100, 1000)` will generate an integer between 100 and 1000 and `Random(string, 1, 2)` will generate a string with the length 1 (2 times).

Here are all the different Random functions that you can use:- (Note that the spaces between commas are necessary)

```javascript
Random(int, min, max); // Generates an int between min and max
Random(float, min, max); // Generates a floating number between min and max rounded to 4 decimal places
Random(string, length, amount); // Generates a string with the specified length (amount times)
Random(date, year1, year2); // Generates a date between year1 and year2
Random(text); // Generates lorem ipsum text
Random(bool);
Random(name);
Random(address);
Random(email);
Random(ipv4);
Random(ipv6);
```

Increment and Decrement functions can be used to differentiate objects. Here is the pattern for these functions:

```javascript
Increment(startValue);
Decrement(startValue);
```
