interface FormateTxDateOptions {
  is24Hour?: boolean;
  suffix?: string;
}

export function formateTxDate(_date: any, options?: FormateTxDateOptions) {
  const { is24Hour, suffix } = options || {};
  const _suffix = suffix ? ' ' + suffix : '';
  if (!_date) return '';
  const monthsStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(_date);
  const monthStr = monthsStr[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const toTwo = (num: number) => (num >= 10 ? num : '0' + num);
  const minutes = date.getMinutes();

  if (is24Hour) {
    return `${monthStr} ${day}, ${year} ${toTwo(hour)}:${toTwo(minutes)}${_suffix}`;
  }

  const hourStr = hour % 12;
  const unit = hour > 11 ? 'PM' : 'AM';

  return `${monthStr} ${day}, ${year} ${toTwo(hourStr)}:${toTwo(minutes)} ${unit}${_suffix}`;
}

export function formatUSDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  } as const;
  return date.toLocaleString('en-US', options);
}

export function formatDateTime(_datetime: any, formatStr: string = 'YYYY-MM-DD hh:mm:ss') {
  if (!_datetime) return '';
  const datetime = new Date(_datetime);
  const values: any = {
    'M+': datetime.getMonth() + 1,
    'D+': datetime.getDate(),
    'h+': datetime.getHours(),
    'm+': datetime.getMinutes(),
    's+': datetime.getSeconds(),
    S: datetime.getMilliseconds()
  };
  let fmt = formatStr;
  const reg = /(Y+)/;
  if (reg.test(fmt)) {
    const y = (reg.exec(fmt) as string[])[1];
    fmt = fmt.replace(y, (datetime.getFullYear() + '').substring(4 - y.length));
  }
  for (const k in values) {
    const regx = new RegExp('(' + k + ')');
    if (regx.test(fmt)) {
      const t = (regx.exec(fmt) as string[])[1];
      fmt = fmt.replace(t, t.length === 1 ? values[k] : ('00' + values[k]).substring(('' + values[k]).length));
    }
  }
  return fmt;
}
