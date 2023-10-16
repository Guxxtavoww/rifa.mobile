import * as Localization from 'expo-localization';

const deviceLanguage = Localization.locale;

export const formatToDate = (
  currentDate: any,
  hasMinutesAndHoursAndSecounds?: boolean
): string => {
  const showSubValues = hasMinutesAndHoursAndSecounds ? '2-digit' : undefined;

  const dateFormatter = new Intl.DateTimeFormat(deviceLanguage, {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
    minute: showSubValues,
    hour: showSubValues,
    second: showSubValues,
  });

  if (currentDate) return dateFormatter.format(new Date(currentDate));

  return '--/--/--';
};

export const formatRelativeTime = (
  value: number,
  formatType?: Intl.RelativeTimeFormatUnit
): string => {
  const formater = new Intl.RelativeTimeFormat(deviceLanguage, {
    numeric: 'auto',
  });

  return formater.format(value, formatType || 'day');
};
