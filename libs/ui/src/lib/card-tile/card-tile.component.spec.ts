import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardTileComponent } from './card-tile.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { EllipsisPipe, AddCommasPipe } from '@workspace/pipes';

describe('CardTileComponent', () => {
  let component: CardTileComponent;
  let fixture: ComponentFixture<CardTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CardTileComponent, EllipsisPipe, AddCommasPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
