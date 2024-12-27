export function parseDateTimeString(dateTimeString: string): {
    day: number;
    month: number;
    year: number;
    hours: number;
    minutes: number;
  } {
    const dateObject = new Date(dateTimeString);
  
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date time string");
    }
  
    // Lấy ngày, tháng, năm, giờ và phút
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
  
    return { day, month, year, hours, minutes };
  }
  