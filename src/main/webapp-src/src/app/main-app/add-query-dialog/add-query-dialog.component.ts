import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FieldRanges} from "../../../helpers/utils";

interface DialogData {
  inputFieldRanges: FieldRanges;
}

@Component({
  selector: 'app-add-query-dialog',
  templateUrl: './add-query-dialog.component.html',
  styleUrls: ['./add-query-dialog.component.css']
})
export class AddQueryDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<AddQueryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: DialogData
  ) { }

  ngOnInit() {
  }

}
