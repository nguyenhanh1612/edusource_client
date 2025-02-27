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

  return {
    day: dateObject.getDate(),
    month: dateObject.getMonth() + 1,
    year: dateObject.getFullYear(),
    hours: dateObject.getHours(),
    minutes: dateObject.getMinutes(),
    seconds: dateObject.getSeconds(), // 🔹 Thêm giây
  };
}
