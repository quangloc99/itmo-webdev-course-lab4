import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { UserEntryComponent } from './user-entry/user-entry.component';
import { MainAppComponent } from './main-app/main-app.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEntryComponent,
    MainAppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatSliderModule,
    MatToolbarModule,
    MatInputModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonModule,

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
