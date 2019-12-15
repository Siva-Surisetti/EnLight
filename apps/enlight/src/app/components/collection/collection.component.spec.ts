import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionComponent } from './collection.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { EllipsisPipe, AddCommasPipe } from '@workspace/pipes';
import { BooksFacade } from '../../+state/books.facade';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [CollectionComponent, EllipsisPipe, AddCommasPipe],
      providers: [BooksFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
