import {environment} from "../environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";

import { AppRoutingModule } from './app-routing.module';
import { UserEntryComponent } from './user-entry/user-entry.component';
import { MainAppComponent } from './main-app/main-app.component';
import { InputFormComponent } from './main-app/input-form/input-form.component';
import { InteractiveInputComponent } from './main-app/interactive-input/interactive-input.component';
import { AddQueryDialogComponent } from './main-app/add-query-dialog/add-query-dialog.component';
import { CheckingAreaPicComponent } from './checking-area-pic/checking-area-pic.component';
import {BaseUrlHttpInceptor} from "./BaseUrlHttpInceptor";

@NgModule({
  declarations: [
    AppComponent,
    UserEntryComponent,
    MainAppComponent,
    InputFormComponent,
    InteractiveInputComponent,
    CheckingAreaPicComponent,
    AddQueryDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    MatSliderModule,
    MatToolbarModule,
    MatInputModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,

    AppRoutingModule,
  ],
  entryComponents: [
    AddQueryDialogComponent,
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: 'APP_BASE_URL', useValue: environment.baseUrl},
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlHttpInceptor, multi: true},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000, verticalPosition: 'top'}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
