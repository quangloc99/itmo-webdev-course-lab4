import {addScreenSizeListener} from "./screen-size-listener";
import {Observable} from "rxjs";

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
  result?: boolean;
}

export interface Point {
  x: number;
  y: number;
}

export interface ApiJSONResponse {
  status: "SUCCESS" | "FAIL",
  message?: string
}

export type DynamicValue<T> = (() => T) | Observable<T> | T;
export function valueGetter<T>(dynamicValue: DynamicValue<T>) : (() => T | null) {
  if (dynamicValue instanceof Observable) {
    let val = null;
    dynamicValue.subscribe({
      next(newVal) { val = newVal; },
      error() { val = null},
    })
    return () => val;
  }
  if (dynamicValue instanceof Function) return dynamicValue;
  return () => dynamicValue;
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

export function numberValueWithComma(val: string) {
  return Number(val.replace(',', '.'));
}

export function encodeFormData(formData: any) {
  const res = [];
  for (const [key, value] of Object.entries(formData)) {
    res.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`);
  }
  return res.join('&');
}

