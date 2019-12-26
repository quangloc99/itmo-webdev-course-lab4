import {Component, Input, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {CheckingHitQuery, FieldRanges, Point} from "../../../helpers/utils";
import {addScreenSizeListener, removeScreenSizeListener} from "../../../helpers/screen-size-listener";
import {CHECKING_AREA_PIC_SIZE, SCREEN_SIZE_SPLITTER} from "../../../helpers/config";

@Component({
  selector: 'app-interactive-input',
  templateUrl: './interactive-input.component.html',
  styleUrls: ['./interactive-input.component.css']
})
export class InteractiveInputComponent implements OnInit {
  private assign = Object.assign;
  @Input() inputFieldRanges: FieldRanges;
  @Output('new-query') onClickEventEmitter = new EventEmitter<CheckingHitQuery>();
  parameterR: number = 3;
  private pictureDomSize: string = "200px";

  constructor() { }

  ngOnInit() {
  }
}
