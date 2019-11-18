import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './component/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';

const MAT_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule
];

@NgModule({
  declarations: [HomeComponent, SidenavComponent, ToolbarComponent],
  imports: [CommonModule, HomeRoutingModule, MAT_MODULES],
  entryComponents: [HomeComponent]
})
export class HomeModule {}
