import { parseDateTimeString } from "@/utils/date";

const DateTimeDisplay = ({ dateTime }: { dateTime: string }) => {
    if (!dateTime) return null;

    try {
        const { day, month, year, hours, minutes, seconds } = parseDateTimeString(dateTime);
        const formatNumber = (num: number) => num.toString().padStart(2, "0");
        return (
            <span>
                {`${formatNumber(day)}-${formatNumber(month)}-${year} ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`}
            </span>
        );
    } catch (error) {
        return <span>Invalid Date</span>;
    }
};

export default DateTimeDisplay;
