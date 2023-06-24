import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByStatusComponent } from './orders-by-status.component';

describe('OrdersByStatusComponent', () => {
  let component: OrdersByStatusComponent;
  let fixture: ComponentFixture<OrdersByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersByStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
