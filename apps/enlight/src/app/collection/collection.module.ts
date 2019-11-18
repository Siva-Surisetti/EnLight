import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './component/collection.component';

@NgModule({
  declarations: [CollectionComponent],
  imports: [CommonModule, CollectionRoutingModule],
  exports: [CollectionComponent]
})
export class CollectionModule {}
