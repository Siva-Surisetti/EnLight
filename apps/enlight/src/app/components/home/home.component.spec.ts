import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { BooksFacade } from '../../+state/books.facade';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let booksFacade: BooksFacade;
  let router: Router;

  const fakeBooksFacade = {
    allBooks$: of(null),
    dispatchSelectedIdToStore: function(arg) {},
    loadBooksToStore: function(arg) {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule.withRoutes([])],
      declarations: [HomeComponent],
      providers: [{ provide: BooksFacade, useValue: fakeBooksFacade }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    booksFacade = TestBed.get(BooksFacade);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component.booksRecords$).toEqual(booksFacade.allBooks$);
  });

  describe('onBookSelect call', () => {
    let routerNavigationSpy;
    let booksFacadeSpy;
    let id;
    beforeEach(() => {
      routerNavigationSpy = spyOn<any>(router, 'navigate');
      booksFacadeSpy = spyOn<any>(booksFacade, 'dispatchSelectedIdToStore');
      id = 1;
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

  describe('onSearchInput call', () => {
    let booksFacadeSpy;
    let searchKey;
    beforeEach(() => {
      booksFacadeSpy = spyOn<any>(booksFacade, 'loadBooksToStore');
      searchKey = 'test';
    });

    it('should dispatch searchKey to store', () => {
      component.onSearch(searchKey);
      expect(booksFacadeSpy).toHaveBeenCalledWith(searchKey);
    });
  });
});
