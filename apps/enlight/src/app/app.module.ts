import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiModule } from '@workspace/libs/ui';
import { ServicesModule } from '@workspace/libs/services';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';
import { BooksFacade } from './+state/books.facade';
import { BooksEffects } from './+state/books.effects';
import * as fromBooksReducer from './+state/books.reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BillingComponent } from './billing/billing.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PurchaseConfirmationComponent } from './purchase-confirmation/purchase-confirmation.component';
import { MatDialogModule, MatBadgeModule } from '@angular/material';
import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './collection/collection.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { CardTileComponent } from './card-tile/card-tile.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { NxModule } from '@nrwl/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CollectionComponent,
    DetailComponent,
    BillingComponent,
    CardTileComponent,
    SearchBarComponent,
    SideNavComponent,
    PurchaseConfirmationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ServicesModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatGridListModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatBadgeModule,
    CommonModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'detail',
          component: DetailComponent
        },
        {
          path: 'cart',
          component: CartComponent
        },
        {
          path: 'billing',
          component: BillingComponent
        },
        {
          path: 'collection',
          component: CollectionComponent
        },
        { path: '', redirectTo: 'home', pathMatch: 'full' }
      ],
      { initialNavigation: 'enabled' }
    ),
    BrowserAnimationsModule,
    StoreModule.forRoot(
      { books: fromBooksReducer.reducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([BooksEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot()
  ],
  entryComponents: [PurchaseConfirmationComponent],
  providers: [BooksFacade],
  bootstrap: [AppComponent]
})
export class AppModule {}
