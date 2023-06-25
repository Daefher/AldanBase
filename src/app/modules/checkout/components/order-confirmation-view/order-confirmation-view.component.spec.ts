import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationViewComponent } from './order-confirmation-view.component';

describe('OrderConfirmationViewComponent', () => {
  let component: OrderConfirmationViewComponent;
  let fixture: ComponentFixture<OrderConfirmationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderConfirmationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
