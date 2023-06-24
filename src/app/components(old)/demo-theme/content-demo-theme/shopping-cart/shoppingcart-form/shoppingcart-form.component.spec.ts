import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingcartFormComponent } from './shoppingcart-form.component';

describe('ShoppingcartFormComponent', () => {
  let component: ShoppingcartFormComponent;
  let fixture: ComponentFixture<ShoppingcartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingcartFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingcartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
