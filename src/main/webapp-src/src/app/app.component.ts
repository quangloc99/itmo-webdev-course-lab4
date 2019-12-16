import { Component, OnInit } from '@angular/core';
import {screenSizeListener} from "../helpers/screen-size-listener";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'webapp-src';

  ngOnInit(): void {
    screenSizeListener([
      {size: 764, name: 'mobile'},
      {size: 1138, name: 'tablet'},
      {size: Infinity, name: 'desktop'},
    ], (environment, oldEnvironment) => {
      console.log(`change screen size from ${oldEnvironment} to ${environment}`);
      if (oldEnvironment) document.body.classList.remove(oldEnvironment);
      document.body.classList.add(environment);
    });
  }
}
