import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcartComponent } from './shoppingcart.component';

describe('ShoppingcartComponent', () => {
  let component: ShoppingcartComponent;
  let fixture: ComponentFixture<ShoppingcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});