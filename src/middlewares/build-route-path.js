import { pathToRegexp } from 'path-to-regexp';
import { parse } from 'querystring';

export function buildRoutePath(path) {
  const keys = [];

  return pathToRegexp(path, keys);
}

export function extractQueryParams(url) {
  const queryString = url.split('?')[1];
  const queryParams = parse(queryString);

  return queryParams.search;
}
