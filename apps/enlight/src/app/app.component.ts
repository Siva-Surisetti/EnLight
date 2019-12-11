import { Component } from '@angular/core';
import { RouteTrackerService } from './services/route-tracker.service';

@Component({
  selector: 'workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private routerService: RouteTrackerService) {}
  title = 'EnLight YourSelf!';
}
