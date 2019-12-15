import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Point} from "../../helpers/utils";

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

  @Output("user-coordinates-input") userCoordinatesInputEvent = new EventEmitter<Point>();

  // it is actually more convenient not to use this value
  // but when the image is too small, the browser display it wrong
  // for some reason like optimization.
  displayingSize = 100;

  constructor() { }

  ngOnInit() {
    // // just for testing animation
    // setInterval(() => {
    //   this.parameterR += 0.5;
    // }, 1000);
  }

  onClick(event: Event) {
    if (!(event instanceof MouseEvent)) {
      return ;
    }
    const target = event.currentTarget;
    if (target === null || !(target instanceof Element)) {
      return ;
    }
    const rect = target.getBoundingClientRect();
    this.userCoordinatesInputEvent.emit(this.domCoordinatesToParameter({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }));
  }

  private domCoordinatesToParameter({x, y}: Point): Point {
    x -= this.domSize / 2;
    y -= this.domSize / 2;
    x *= this.relativeSize / this.domSize * 2;
    y *= -1 * this.relativeSize / this.domSize * 2;
    return {x, y};
  }

  get viewBox() {
    return `${-this.displayingSize} ${-this.displayingSize} ${2 * this.displayingSize} ${2 * this.displayingSize}`;
  }

  get displayingR() {
    return this.parameterR / this.relativeSize * this.displayingSize;
  }

}
