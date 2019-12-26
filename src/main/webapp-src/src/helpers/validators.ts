import {AbstractControl, ValidationErrors} from "@angular/forms";
import {DynamicValue, numberValueWithComma, valueGetter} from "./utils";

export function min(minValue: DynamicValue<number>, formatter = parseFloat) {
  const minValueGetter = valueGetter(minValue);
  return (control: AbstractControl) : ValidationErrors | null => {
    const minValue = minValueGetter();
    if (control.value === null || control.value.length == 0 || minValue === null) {
      return null;
    }
    const val = formatter(control.value);
    return !isNaN(val) && val < minValue ? {min : {min: minValue, actual: val}} : null;
  }
}

export function max(maxValue: DynamicValue<number>, formatter = parseFloat) {
  const maxValueGetter = valueGetter(maxValue);
  return (control: AbstractControl) : ValidationErrors | null => {
    const maxValue = maxValueGetter();
    if (control.value === null || control.value.length == 0 || maxValue === null) {
      return null;
    }
    const val = formatter(control.value);
    return !isNaN(val) && val > maxValue ? {max: {max: maxValue, actual: val}} : null;
  }
}
