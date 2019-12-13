import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTileComponent } from './card-tile/card-tile.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardTileComponent, RatingComponent]
})
export class UiModule {}
