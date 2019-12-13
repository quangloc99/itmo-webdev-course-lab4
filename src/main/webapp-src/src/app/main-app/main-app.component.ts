import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FieldRanges} from "../../helpers/utils";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  inputFieldRanges: FieldRanges;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("assets/input-field-ranges.json").subscribe((data) =>
      this.inputFieldRanges = data as FieldRanges
    );
  }

}
