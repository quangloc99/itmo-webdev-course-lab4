import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiJSONResponse, encodeFormData} from "../../helpers/utils";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.css']
})
export class UserEntryComponent implements OnInit {
  submitting = false;
  emailControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  passwordControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6),
  ]);

  confirmPasswordControl = new FormControl("", [
    Validators.required,
    (control) => {
      if (control.value !== this.passwordControl.value) {
        return {"unmatch-confirm-password": {}};
      }
      return null;
    }
  ]);

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  hasLoginValidationError() {
    return !!(this.emailControl.errors || this.passwordControl.errors);
  }

  hasRegisterValidationError() {
    return !!(this.emailControl.errors || this.passwordControl.errors || this.confirmPasswordControl.errors);
  }

  // doLogin and doRegister is very similar to each other.
  // I am still considering how to merge them into one.
  doLogin() {
    this.submitting = true;
    this.http.post<ApiJSONResponse>("api/user-entry/login",
      this.submittingData,
      {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
    ).subscribe(
      res => {
        this.router.navigateByUrl('/main-app');
        this.submitting = false;
      },
      err => {
        this.submitting = false;
        this.snackBar.open(err.error.message);
      }
    );
  }

  doRegister() {
    this.submitting = true;
    this.http.post<ApiJSONResponse>("api/user-entry/register",
      this.submittingData,
      {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}
      ).subscribe(
      res => {
        this.router.navigateByUrl('/main-app');
        this.submitting = false;
      } ,

      err => {
        this.submitting = false;
        this.snackBar.open(err.error.message);
      }
    );
  }

  private get submittingData() {
    return encodeFormData({
      email: this.emailControl.value,
      password: this.passwordControl.value
    });
  }
}
