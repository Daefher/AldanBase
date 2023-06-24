import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDetailViewComponent } from './orders-detail-view.component';

describe('OrdersDetailViewComponent', () => {
  let component: OrdersDetailViewComponent;
  let fixture: ComponentFixture<OrdersDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
