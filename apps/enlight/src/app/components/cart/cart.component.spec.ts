import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { EllipsisPipe, AddCommasPipe } from '@workspace/pipes';
import { MatCardTitle } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { BooksFacade } from '../../+state/books.facade';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [CartComponent, MatCardTitle, EllipsisPipe, AddCommasPipe],
      providers: [BooksFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
