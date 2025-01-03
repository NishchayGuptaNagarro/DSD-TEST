import {addMinutes, format} from 'date-fns';

export const getLocalDate = (utcDate: string): string => {
  const offsetMinutes = new Date().getTimezoneOffset();
  const date = new Date(utcDate);
  const localDate = addMinutes(date, -offsetMinutes);
  return format(localDate, 'dd MMMM, yyyy');
};
