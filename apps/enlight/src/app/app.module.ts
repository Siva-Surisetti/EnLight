import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiModule } from '@workspace/libs/ui';
import { ServicesModule } from '@workspace/libs/services';
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module';
import { CollectionModule } from './collection/collection.module';
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
import { DetailComponent } from './Detail/component/detail.component';
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

@NgModule({
  declarations: [AppComponent, DetailComponent, BillingComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    ServicesModule,
    UiModule,
    HomeModule,
    CartModule,
    CollectionModule,
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
    RouterModule.forRoot(
      [{ path: '', redirectTo: 'home', pathMatch: 'full' }],
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
  providers: [BooksFacade],
  bootstrap: [AppComponent]
})
export class AppModule {}
