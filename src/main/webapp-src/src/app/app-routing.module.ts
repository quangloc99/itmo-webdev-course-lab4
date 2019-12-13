import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";

import {UserEntryComponent} from "./user-entry/user-entry.component";
import {MainAppComponent} from "./main-app/main-app.component";

const appRouts: Routes = [
  { path: "", component: UserEntryComponent },
  { path: "user-entry", component: UserEntryComponent },
  { path: "main-app", component: MainAppComponent },
  // TODO 404 page
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRouts, {enableTracing: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
