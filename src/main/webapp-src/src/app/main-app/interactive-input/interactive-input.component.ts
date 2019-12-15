import {Component, Input, OnInit} from '@angular/core';
import {FieldRanges, Point} from "../../../helpers/utils";

@Component({
  selector: 'app-interactive-input',
  templateUrl: './interactive-input.component.html',
  styleUrls: ['./interactive-input.component.css']
})
export class InteractiveInputComponent implements OnInit {
  @Input() inputFieldRanges: FieldRanges;
  parameterR: number = 3;

  testX: number = 0;
  testY: number = 0;

  constructor() { }

  ngOnInit() {
  }

  logCoordinates(p: Point) {
    console.log(p);
    this.testX = p.x;
    this.testY = p.y;
  }

}
