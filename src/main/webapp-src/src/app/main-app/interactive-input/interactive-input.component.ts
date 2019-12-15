import { Component, OnInit } from '@angular/core';
import {Point} from "../../../helpers/utils";

@Component({
  selector: 'app-interactive-input',
  templateUrl: './interactive-input.component.html',
  styleUrls: ['./interactive-input.component.css']
})
export class InteractiveInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logCoordinates(p: Point) {
    console.log(p);
  }

}
