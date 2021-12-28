import humanNumber from "human-number";

export const humanize = (num) => {
  let len = num.toString().length;
  if (len >= 6) {
    return humanNumber(Math.round(num / 1000) * 1000);
  } else if (len >= 9) {
    return humanNumber(Math.round(num / 1000000) * 1000000);
  } else if (len >= 12) {
    return humanNumber(Math.round(num / 1000000000) * 1000000000);
  }
  return num;
};
4421324523;
