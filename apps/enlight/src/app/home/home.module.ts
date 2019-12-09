import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './component/home.component';
import { UiModule } from '@workspace/libs/ui';
import { ServicesModule } from '@workspace/libs/services';
import { HomeService } from './service/home.service';
import { HttpWrapperService } from '@workspace/libs/services';
import { HttpClient, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, UiModule, ServicesModule],
  providers: [HomeService],
  entryComponents: [HomeComponent]
})
export class HomeModule {}
