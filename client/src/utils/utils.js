export const formateString = (string) => {
  let str = string;
  if (string.length > 70) {
    str = string.substr(1, 70);
    str += "...";
  }
  return str;
};

export const formateStringInUser = (string) => {
  let str = string;
  if (string.length > 50) {
    str = string.substr(1, 50);
    str += "...";
  }
  return str;
};
