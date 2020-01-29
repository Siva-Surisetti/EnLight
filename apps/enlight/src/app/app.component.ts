import { Component } from '@angular/core';
import { RouteTrackerService } from '@workspace/libs/services';
import { BOOKS_CONSTANTS } from './constants/books_constants';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private routerService: RouteTrackerService) {}
  title = BOOKS_CONSTANTS.PAGE_TITLE;
}
