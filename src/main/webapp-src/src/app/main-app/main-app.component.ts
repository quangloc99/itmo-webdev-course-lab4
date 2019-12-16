import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CheckingHitQuery, FieldRanges} from "../../helpers/utils";

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
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("assets/input-field-ranges.json").subscribe((data) =>
      this.inputFieldRanges = data as FieldRanges
    );
  }

}
