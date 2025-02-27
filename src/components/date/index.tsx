import { parseDateTimeString } from "@/utils/date";

const DateTimeDisplay = ({ dateTime }: { dateTime: string }) => {
    if (!dateTime) return null;

    try {
        const { day, month, year, hours, minutes, seconds } = parseDateTimeString(dateTime);
        return <span>{`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`}</span>;
    } catch (error) {
        return <span>Invalid Date</span>;
    }
};
export default DateTimeDisplay; 