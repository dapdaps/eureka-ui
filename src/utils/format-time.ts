import { format, formatDistanceToNowStrict,parseISO } from "date-fns";

type InputValue = Date | string | number | null | undefined;

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNowStrict(new Date(date), {
        addSuffix: true,
      })
    : '';
}


export const formatDateString = (
  dateStr: string | undefined | null, 
  formatStr: string = "dd MMMM, yyyy | EEEE hh : mm a"
): string | null => {
  if (!dateStr) {
    return null
  }
  try {
    const parsedDate = parseISO(dateStr);
    if (isNaN(parsedDate.getTime())) {
      return null
    }
    return format(parsedDate, formatStr);
  } catch (error) {
    return null
  }
};



export const formatTimeAgo = (createdAt: string | null | undefined): string => {
  const relativeTime = {
    second: 'sec',
    seconds: 'secs',
    minute: 'min',
    minutes: 'mins',
    hour: 'hour',
    hours: 'hours',
    day: 'day',
    days: 'days',
  };
  const getTimeDifferenceInSeconds = (date: Date, now: Date): number => {
    return Math.floor((now.getTime() - date.getTime()) / 1000);
  };
  const formatTimeUnit = (value: number, unit: keyof typeof relativeTime): string => {
    const formattedUnit = relativeTime[unit];
    return `${value} ${formattedUnit}${value > 1 ? 's' : ''} ago`;
  };
  if (!createdAt) return 'invalid date';
  
  const date = new Date(createdAt);
  if (isNaN(date.getTime())) return 'invalid date';

  const now = new Date();
  const secondsAgo = getTimeDifferenceInSeconds(date, now);
  if (secondsAgo < 60) return 'just now';

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return formatTimeUnit(minutesAgo, 'minute');

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return formatTimeUnit(hoursAgo, 'hour');

  const daysAgo = Math.floor(hoursAgo / 24);
  return formatTimeUnit(daysAgo, 'day');
};