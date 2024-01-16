export const formatDateTime = (dateString: string) => {
  const inputDate = new Date(dateString);

  interface DateOptions {
    [key: string]: any;
  }

  interface TimeOptions {
    [key: string]: any;
  }

  const dateOptions: DateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const timeOptions: TimeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return `${inputDate
    .toLocaleDateString(undefined, dateOptions)
    .replace(/\//g, '-')} || ${inputDate
    .toLocaleTimeString(undefined, timeOptions)
    .toLocaleUpperCase()}`;
};

export const capitalizeFirstLetter = (str: string) => {
  console.log(str);

  return str.charAt(0).toUpperCase() + str.slice(1);
};
