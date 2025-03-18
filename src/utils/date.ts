export function parseDateTimeString(dateTimeString: string): {
  day: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const dateObject = new Date(dateTimeString);

  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date time string");
  }

  const vietnamOffset = 7 * 60 * 60 * 1000; 
  const localTime = new Date(dateObject.getTime() + vietnamOffset);

  return {
    day: localTime.getDate(),
    month: localTime.getMonth() + 1,
    year: localTime.getFullYear(),
    hours: localTime.getHours(),
    minutes: localTime.getMinutes(),
    seconds: localTime.getSeconds(),
  };
}
