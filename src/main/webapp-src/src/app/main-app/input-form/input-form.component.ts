import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldRanges, range, numberValueWithComma, CheckingHitQuery} from "../../../helpers/utils";
import * as CustomValidators from "../../../helpers/validators";
import {FormControl, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  @Input() inputFieldRanges: FieldRanges;   // this field is lazy loaded

  yFormControl = new FormControl(null, [
    Validators.required,
    Validators.maxLength(9),
    (control) =>
      (control.value !== null && control.value !== "" && isNaN(numberValueWithComma(control.value)) ? {"NaN" : control.value} : null),
    CustomValidators.min(() => this.inputFieldRanges ? this.inputFieldRanges.y.min : null, numberValueWithComma),
    CustomValidators.max(() => this.inputFieldRanges ? this.inputFieldRanges.y.max : null, numberValueWithComma),
  ]);

  private xValues = new Map<number, boolean>();
  private get yValue() {
    if (this.yFormControl.errors) return null;
    return numberValueWithComma(this.yFormControl.value);
  }
  private rValues = new Map<number, boolean>();

  private get acceptedXValues() {
    return [...this.xValues].filter(([key, val]) => val).map(([key, val]) => key);
  }

  private get acceptedRValues() {
    return [...this.rValues].filter(([key, val]) => val).map(([key, val]) => key);
  }

  range = range;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();
    return false;
  }

  hasError() {
    return !!this.yFormControl.errors;
  }

  generateQueries() {
    if (this.hasError()) return null;
    const xs = this.acceptedXValues;
    const y = this.yValue;
    const rs = this.acceptedRValues;
    const ans: CheckingHitQuery[] = [];
    for (const x of xs) {
      for (const r of rs) {
        ans.push({ x, y, r });
      }
    }
    return ans;
  }

  getNumberOfQueries() {
    return this.acceptedRValues.length * this.acceptedXValues.length;
  }


}
