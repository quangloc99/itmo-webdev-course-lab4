import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { AppRoutingModule } from './app-routing.module';
import { UserEntryComponent } from './user-entry/user-entry.component';
import { MainAppComponent } from './main-app/main-app.component';
import { InputFormComponent } from './main-app/input-form/input-form.component';
import { InteractiveInputComponent } from './main-app/interactive-input/interactive-input.component';
import { AddQueryDialogComponent } from './main-app/add-query-dialog/add-query-dialog.component';
import { CheckingAreaPicComponent } from './checking-area-pic/checking-area-pic.component';

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

    AppRoutingModule,
  ],
  entryComponents: [
    AddQueryDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
