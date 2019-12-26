import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CheckingHitQuery, FieldRanges, getCSSVariable} from "../../helpers/utils";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  inputFieldRanges: FieldRanges;

  testData: CheckingHitQuery[] = [
    {id: 1, x: 1, y: 2, r: 3, result: true},
    {id: 2, x: -1, y: 2, r: 4, result: false},
    {id: 3, x: 3, y: -2, r: 2, result: false},
    {id: 4, x: -5, y: -3, r: 5, result: true},
    {id: 1, x: 1, y: 2, r: 3, result: true},
    {id: 2, x: -1, y: 2, r: 4, result: false},
    {id: 3, x: 3, y: -2, r: 2, result: false},
    {id: 4, x: -5, y: -3, r: 5, result: true},
    {id: 1, x: 1, y: 2, r: 3, result: true},
    {id: 2, x: -1, y: 2, r: 4, result: false},
    {id: 3, x: 3, y: -2, r: 2, result: false},
    {id: 4, x: -5, y: -3, r: 5, result: true},
    {id: 1, x: 1, y: 2, r: 3, result: true},
    {id: 2, x: -1, y: 2, r: 4, result: false},
    {id: 3, x: 3, y: -2, r: 2, result: false},
    {id: 4, x: -5, y: -3, r: 5, result: true},
  ];

  data: CheckingHitQuery[] = this.testData;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("assets/input-field-ranges.json").subscribe((data) =>
      this.inputFieldRanges = data as FieldRanges
    );
  }


  displayingColumns = ['show-button', 'x', 'y', 'r', 'result'];
  private getCSSVariable = getCSSVariable;

  private _selectedQuery: CheckingHitQuery = null;

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
