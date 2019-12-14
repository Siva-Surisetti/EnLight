import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCommasPipe } from './add-commas/add-commas.pipe';
import { EllipsisPipe } from './ellipsis/ellipsis.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [AddCommasPipe, EllipsisPipe]
})
export class PipesModule {}
