import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RatingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display stars based on input value', () => {
    component.rating = '3.5';
    component.ngOnInit();
    expect(component.finalStars).toEqual([
      'star',
      'star',
      'star',
      'star_half',
      'star_border'
    ]);
  });
});
