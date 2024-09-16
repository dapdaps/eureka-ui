export function getUTCTime(_date?: any) {
  const d1 = new Date(_date);
  const d2 = new Date(
    d1.getUTCFullYear(),
    d1.getUTCMonth(),
    d1.getUTCDate(),
    d1.getUTCHours(),
    d1.getUTCMinutes(),
    d1.getUTCSeconds()
  );
  return Date.parse(d2 as any);
}
// utc current day pm12
export function getPM12Time() {
  const year = new Date().getUTCFullYear();
  const month = new Date().getUTCMonth();
  const date = new Date().getUTCDate();

  const pm12 = new Date(Date.UTC(year, month, date, 24));
  //   console.log(pm12.toUTCString());
  //   console.log(Date.parse(pm12 as any));
  return Date.parse(pm12 as any);
}

// utc current day next hour
export function getNextHourTime() {
  const year = new Date().getUTCFullYear();
  const month = new Date().getUTCMonth();
  const date = new Date().getUTCDate();
  const _hour = new Date().getUTCHours();
  const hour = _hour === 23 ? 0 : _hour + 1;

  const nextHour = new Date(Date.UTC(year, month, date, hour));
  //   console.log(nextHour.toUTCString());
  //   console.log(Date.parse(nextHour as any));
  return Date.parse(nextHour as any);
}
