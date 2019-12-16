export interface Range {
  min: number;
  max: number;
  step?: number;
}

export interface FieldRanges {
  [key: string]: Range;
}

export interface CheckingHitQuery {
  id?: number;
  x: number;
  y: number;
  r: number;
  result: boolean;
}

export interface Point {
  x: number;
  y: number;
}

export function range(from: number, to: number, step: number = 1) {
  let ans = [];
  for (let i = from; (step >= 0) ? (i < to) : (i > to); i += step) {
    ans.push(i);
  }
  return ans;
}

export function getCSSVariable(name: string, elm = document.documentElement) {
  return getComputedStyle(elm).getPropertyValue(name);
}
