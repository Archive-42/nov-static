export const paramsToString = (params) =>
  Object.keys(params)
    .map((key) => camelToSnake(key) + "=" + params[key])
    .join("&");

export const snakeToCamel = (s) =>
  s.replace(/(_\w)/g, (m) => m[1].toUpperCase());

export const camelToSnake = (s) =>
  s.replace(/[\w]([A-Z])/g, (m) => m[0] + "_" + m[1]).toLowerCase();
