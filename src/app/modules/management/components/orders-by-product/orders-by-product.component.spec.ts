import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByProductComponent } from './orders-by-product.component';

describe('OrdersByProductComponent', () => {
  let component: OrdersByProductComponent;
  let fixture: ComponentFixture<OrdersByProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersByProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
