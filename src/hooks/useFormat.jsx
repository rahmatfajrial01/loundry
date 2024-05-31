const useFormat = () => {
  const DATETIME_FORMAT = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: import.meta.env.VITE_TIME_ZONE,
  };

  const DATE_FORMAT = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: import.meta.env.VITE_TIME_ZONE,
  };
  const toCurrency = (value) => {
    const locale = import.meta.env.VITE_LOCALE;
    const config = {
      style: "currency",
      currency: import.meta.env.VITE_CURRENCY,
      maximumSignificantDigits: 1,
    };
    return new Intl.NumberFormat(locale, config).format(value);
  };

  const toDate = (data) => {
    if (!data) {
      return "No defined";
    }
    const date = Date.parse(data);
    return Intl.DateTimeFormat(import.meta.env.VITE_LOCALE, DATE_FORMAT).format(
      date
    );
  };

  const toDateTime = (data) => {
    if (!data) {
      return "No defined";
    }
    const date = Date.parse(data);
    return Intl.DateTimeFormat(
      import.meta.env.VITE_LOCALE,
      DATETIME_FORMAT
    ).format(date);
  };

  return { toCurrency, toDate, toDateTime };
};

export default useFormat;
