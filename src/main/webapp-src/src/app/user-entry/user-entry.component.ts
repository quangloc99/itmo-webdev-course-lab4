import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

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

  constructor() { }

  ngOnInit() {
  }

  hasLoginValidationError() {
    return !!(this.emailControl.errors || this.passwordControl.errors);
  }

  hasRegisterValidationError() {
    return !!(this.emailControl.errors || this.passwordControl.errors || this.confirmPasswordControl.errors);
  }
}
