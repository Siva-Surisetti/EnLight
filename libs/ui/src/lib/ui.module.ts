import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTileComponent } from './card-tile/card-tile.component';
import { RatingComponent } from './rating/rating.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardTileComponent, RatingComponent, SearchBarComponent]
})
export class UiModule {}
