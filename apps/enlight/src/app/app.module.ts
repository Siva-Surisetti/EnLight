import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatBadgeModule,
  MatExpansionModule,
  MatSnackBarModule
} from '@angular/material';

import { NxModule } from '@nrwl/angular';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ServicesModule } from '@workspace/libs/services';
import { AddCommasPipe, EllipsisPipe } from '@workspace/pipes';
import {
  CardTileComponent,
  RatingComponent,
  SearchBarComponent
} from '@workspace/ui';

import { environment } from '../environments/environment';
import { BooksFacade } from './+state/books.facade';
import { BooksEffects } from './+state/books.effects';
import * as fromBooksReducer from './+state/books.reducer';
import { BillingComponent } from './components/billing/billing.component';
import { CartComponent } from './components/cart/cart.component';
import { CollectionComponent } from './components/collection/collection.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    RatingComponent,
    EllipsisPipe,
    AddCommasPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    AppRoutingModule,
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
    FormsModule,
    MatBadgeModule,
    CommonModule,
    MatExpansionModule,
    MatSnackBarModule,
    NxModule.forRoot(),
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
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  entryComponents: [],
  providers: [BooksFacade],
  bootstrap: [AppComponent]
})
export class AppModule {}
