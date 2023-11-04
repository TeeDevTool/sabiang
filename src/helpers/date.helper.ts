const SCALE_MILLISECOND = 1000;
const SCALE_TIME_DAY = 24;
const SCALE_TIME_HOUR = 60;
const SCALE_TIME_MINUTE = 60;

type DateFormatType = `${number}-${number}-${number}`;

export function parseDateToThaiFormat(date: Date): DateFormatType {
  const localeDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [month, day, year] = localeDate.split("/");

  return `${parseInt(day)}-${parseInt(month)}-${parseInt(year)}`;
}

export function calculateDaysFromNow(date: Date): number {
  const currentDate = Date.now();
  const diff = date.getTime() - currentDate;

  return Math.floor(
    diff / (SCALE_MILLISECOND * SCALE_TIME_HOUR * SCALE_TIME_HOUR * SCALE_TIME_DAY)
  );
}
