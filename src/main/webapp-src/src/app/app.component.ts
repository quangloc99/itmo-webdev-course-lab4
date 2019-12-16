import {Component, OnInit} from '@angular/core';
import {addScreenSizeListener} from "../helpers/screen-size-listener";
import {SCREEN_SIZE_SPLITTER} from "../helpers/config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'webapp-src';

  ngOnInit(): void {
    addScreenSizeListener(SCREEN_SIZE_SPLITTER, (environment, oldEnvironment) => {
      console.log(`change screen size from ${oldEnvironment} to ${environment}`);
      if (oldEnvironment) document.body.classList.remove(oldEnvironment);
      document.body.classList.add(environment);
    });
  }
}
