import { formatDistanceToNowStrict } from 'date-fns';
import { format, parseISO } from "date-fns";

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