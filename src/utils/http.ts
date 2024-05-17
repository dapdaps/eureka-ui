export const removeEmptyKeys = (obj: Record<string, any>): Record<string, any> => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  });
  return obj;
};

export const objectToQueryString = (obj: Record<string, any>): string => {
  const keyValuePairs = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        for (const val of value) {
          keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
        }
      } else {
        keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }
  return keyValuePairs.join('&');
};

const get = async (url: string, query?: Record<string, any>) => {
  const options = {
    method: 'GET',
  };
  if (!query) {
    const res = await fetch(url, options);
    return res.json() as any;
  }

  query = removeEmptyKeys(query);
  const queryStr = objectToQueryString(query);

  const res = await fetch(`${url}?${queryStr}`, options);
  return res.json() as any;
};

export { get };
