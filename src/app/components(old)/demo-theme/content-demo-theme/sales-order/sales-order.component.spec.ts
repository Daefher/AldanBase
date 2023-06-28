import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderComponent } from './sales-order.component';

describe('SalesOrderComponent', () => {
  let component: SalesOrderComponent;
  let fixture: ComponentFixture<SalesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
