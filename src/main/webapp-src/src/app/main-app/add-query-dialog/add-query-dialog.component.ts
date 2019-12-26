import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CheckingHitQuery, FieldRanges} from "../../../helpers/utils";
import {InputFormComponent} from "../input-form/input-form.component";

interface DialogData {
  inputFieldRanges: FieldRanges;
}

@Component({
  selector: 'app-add-query-dialog',
  templateUrl: './add-query-dialog.component.html',
  styleUrls: ['./add-query-dialog.component.css']
})
export class AddQueryDialogComponent implements OnInit {
  @ViewChild("inputForm", undefined)
  private inputForm: InputFormComponent;

  constructor(
    public dialog: MatDialogRef<AddQueryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: DialogData
  ) { }

  ngOnInit() {
  }

}
