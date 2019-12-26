import {Component, Input, OnInit} from '@angular/core';
import {FieldRanges, range, numberValueWithComma} from "../../../helpers/utils";
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

  xValues = new Map<string, boolean>();
  get yValue() {
    if (this.yFormControl.errors) return null;
    return numberValueWithComma(this.yFormControl.value);
  }
  zValues = new Map<string, boolean>();

  range = range;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();
    return false;
  }
}
