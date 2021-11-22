export const formatClockTime = function (time) {
  let secs = `${time % 60}`.padStart(2, "0");
  let mins = `${Math.floor(time / 60)}`.padStart(2, "0");

  return `${mins}:${secs}`;
};
