import { Component, OnInit, Input } from '@angular/core';
import {CheckingHitQuery, getCSSVariable} from "../../../helpers/utils";

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  @Input() data: CheckingHitQuery[];
  displayingColumns = ['show-button', 'x', 'y', 'r', 'result'];
  private getCSSVariable = getCSSVariable;

  private _selectedQuery: CheckingHitQuery = null;

  constructor() { }

  ngOnInit() {
  }

  showRow(query: CheckingHitQuery) {
    console.log(query);
    this._selectedQuery = query;
  }

  get selectedQuery(): CheckingHitQuery {
    if (this._selectedQuery === null) {
      return { x: 0, y: 0, r: 0, result: false};
    }
    return this._selectedQuery;
  }
}
