import { Component, OnInit, Input } from '@angular/core';
import {CheckingHitQuery} from "../../../helpers/utils";

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  @Input() data: CheckingHitQuery[];
  displayingColumns = ['show-button', 'x', 'y', 'r', 'result'];

  selectedQuery: CheckingHitQuery = null;

  constructor() { }

  ngOnInit() {
  }

  showRow(query: CheckingHitQuery) {
    console.log(query);
    this.selectedQuery = query;
  }

}
