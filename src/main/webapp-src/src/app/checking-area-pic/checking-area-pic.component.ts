import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-checking-area-pic',
  templateUrl: './checking-area-pic.component.html',
  styleUrls: ['./checking-area-pic.component.css']
})
export class CheckingAreaPicComponent implements OnInit {
  @Input("dom-size") domSize: number = 200;
  @Input("parameter-size") relativeSize: number = 5;
  @Input("parameter-r") parameterR: number = 3;
  @Input() color: string = "red";

  displayingSize = 100;

  constructor() { }

  ngOnInit() {
    // // just for testing animation
    // setInterval(() => {
    //   this.parameterR += 0.5;
    // }, 1000);
  }

  get viewBox() {
    return `${-this.displayingSize} ${-this.displayingSize} ${2 * this.displayingSize} ${2 * this.displayingSize}`;
  }

  get displayingR() {
    return this.parameterR / this.relativeSize * this.displayingSize;
  }

}
