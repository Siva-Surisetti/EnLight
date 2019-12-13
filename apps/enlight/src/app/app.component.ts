import { Component } from '@angular/core';
import { RouteTrackerService } from '@workspace/libs/services';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private routerService: RouteTrackerService) {}
  title = 'EnLight YourSelf!';
}
