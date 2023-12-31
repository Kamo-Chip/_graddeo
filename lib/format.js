import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";

export const timeSincePosted = (timestamp) => {
  let date = timestamp.toDate();
  let distance = formatDistanceToNowStrict(date);

  let formattedDistance = distance.includes("seconds")
    ? "now"
    : distance
        .replaceAll("seconds", "s")
        .replaceAll("minutes", "m")
        .replaceAll("hours", "hr")
        .replaceAll("days", "d")
        .replaceAll("months", "mos")
        .replaceAll("years", "yr");
  return formattedDistance;
};

// converts string from input of type date to an actual formatted date
export const convertToFormattedDate = (dateStr) => {
  if (!dateStr) {
    return;
  }

  let date = format(new Date(dateStr), "dd MMM yyyy");

  return date;
};
