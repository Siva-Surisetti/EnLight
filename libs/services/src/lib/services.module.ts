import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpWrapperService } from '../lib/http/http-wrapper.service';
import { LoggerService } from '../lib/logger/logger.service';

@NgModule({
  imports: [CommonModule],
  providers: [HttpWrapperService, LoggerService]
})
export class ServicesModule {}
