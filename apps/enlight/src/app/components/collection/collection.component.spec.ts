import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionComponent } from './collection.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { EllipsisPipe, AddCommasPipe } from '@workspace/pipes';
import { BooksFacade } from '../../+state/books.facade';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let booksFacade: BooksFacade;
  let router: Router;

  const fakeBooksFacade = {
    collectionBooks$: of({}),
    dispatchSelectedIdToStore: function(arg) {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
      declarations: [CollectionComponent, EllipsisPipe, AddCommasPipe],
      providers: [{ provide: BooksFacade, useValue: fakeBooksFacade }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    booksFacade = TestBed.get(BooksFacade);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component.collectionItems).toEqual({});
  });

  describe('onBookSelect', () => {
    let routerNavigationSpy;
    let booksFacadeSpy;
    let id;
    beforeEach(() => {
      routerNavigationSpy = spyOn<any>(router, 'navigate');
      booksFacadeSpy = spyOn<any>(booksFacade, 'dispatchSelectedIdToStore');
      id = '1';
    });

    it('should navigate to detail page', () => {
      component.onBookSelect(id);
      expect(routerNavigationSpy).toHaveBeenCalledWith(['detail']);
    });

    it('should dispatch selected id to store', () => {
      component.onBookSelect(id);
      expect(booksFacadeSpy).toHaveBeenCalledWith(id);
    });
  });
});
