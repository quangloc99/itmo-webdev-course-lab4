import {Component, Input, OnInit} from '@angular/core';
import {FieldRanges, range} from "../../../helpers/utils";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  @Input() inputFieldRanges: FieldRanges;

  range = range;

  constructor() { }

  ngOnInit() {
  }

}
