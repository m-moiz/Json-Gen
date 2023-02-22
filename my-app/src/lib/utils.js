import {
  MAX_ALLOWED_NUMBER_OF_OBJECTS,
  MIN_ALLOWED_NUMBER_OF_OBJECTS,
} from "../config";

export const outOfBounds = (e) => {
  if (
    e.target.value === MIN_ALLOWED_NUMBER_OF_OBJECTS ||
    e.target.value === "" ||
    e.target.value > MAX_ALLOWED_NUMBER_OF_OBJECTS ||
    isNaN(e.target.value)
  ) {
    return true;
  }
  return false;
};

export const generateFileUrl = (input) => {
  const blob = new Blob([JSON.stringify(input)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  return url;
};
