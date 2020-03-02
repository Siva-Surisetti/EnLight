import { Component } from '@angular/core';
import { RouteTrackerService } from '@workspace/libs/services';
import { APP_CONSTANTS } from '@workspace/constants';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private routerService: RouteTrackerService) {}
  title = APP_CONSTANTS.PAGE_TITLE;
}
