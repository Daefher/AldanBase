import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersInfoComponent } from './orders-info.component';

describe('OrdersInfoComponent', () => {
  let component: OrdersInfoComponent;
  let fixture: ComponentFixture<OrdersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
