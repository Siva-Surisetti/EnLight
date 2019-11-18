import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchBarComponent, SideNavComponent],
  exports: [SearchBarComponent, SideNavComponent]
})
export class UiModule {}
