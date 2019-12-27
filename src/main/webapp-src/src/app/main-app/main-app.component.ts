import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiJSONResponse, CheckingHitQuery, encodeFormData, FieldRanges, getCSSVariable} from "../../helpers/utils";
import {MatDialog} from "@angular/material/dialog";
import {AddQueryDialogComponent} from "./add-query-dialog/add-query-dialog.component";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of, onErrorResumeNext} from "rxjs";
import {concatAll, map} from "rxjs/operators";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  @ViewChild('checkingHitQueriesTable', null)
  checkingHitQueriesTable: MatTable<CheckingHitQuery>;
  userEmail: string;
  data: CheckingHitQuery[];

  inputFieldRanges: FieldRanges;

  addQueryDialog;
  isLoggingOut = false;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.http.get("./assets/input-field-ranges.json").subscribe((data) =>
      this.inputFieldRanges = data as FieldRanges
    );

    this.http.get("api/app/user-info?with-queries=true").subscribe(
      ({result: {email, queries = []}}: any) => {
        this.userEmail = email;
        this.data = queries;
        this.resetSelectedQuery();
      },
      (error) => {
        this.snackBar.open(error.error.message);
        this.router.navigateByUrl("/user-entry");
      }
    )
  }


  displayingColumns = ['show-button', 'x', 'y', 'r', 'result'];
  private getCSSVariable = getCSSVariable;

  private _selectedQuery: CheckingHitQuery = null;

  showRow(query: CheckingHitQuery) {
    console.log(query);
    this._selectedQuery = query;
  }

  showAddQueryDialog() {
    this.addQueryDialog = this.dialog.open(AddQueryDialogComponent, {
      data: { inputFieldRanges: this.inputFieldRanges }
    });
    this.addQueryDialog.afterClosed().subscribe((res) => {
      this.addQueries(res);
    });
  }

  addQueries(generatedQueries: CheckingHitQuery[]) {
    let addedQueryCount = 0;
    (of(...generatedQueries).pipe(
      map(query => this.http.get(`api/app/check-hit?${encodeFormData(query)}`)),
      concatAll()
    )).pipe(
      map((res: ApiJSONResponse) => res.result)
    ).subscribe(
      (query: CheckingHitQuery) => {
        ++addedQueryCount;
        this.data.unshift(query);
      },
      (error) => console.log(error),
      () => {
        this.snackBar.open(
          (addedQueryCount > 0 ? `Added ${addedQueryCount} queries. ` : '') +
          (addedQueryCount < generatedQueries.length - 1 ? `${generatedQueries.length - addedQueryCount} queries could not be add for some reasons.` : '')
        );
        this.resetSelectedQuery();
        this.checkingHitQueriesTable.renderRows();
      }
    );
  }

  resetSelectedQuery() {
    this._selectedQuery = this.data.length > 0 ? this.data[0] : null;
  }

  get selectedQuery(): CheckingHitQuery {
    if (this._selectedQuery === null) {
      return { x: 0, y: 0, r: 0, result: false};
    }
    return this._selectedQuery;
  }

  doLogout() {
    this.isLoggingOut = true;
    this.http.post('api/user-entry/logout', '')
      .subscribe(
        res => this.router.navigateByUrl('/user-entry'),
        error => {
          this.isLoggingOut = false;
          this.snackBar.open(error.error.message);
        }
      )
  }
}
