import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrdersComponent } from './sales-orders.component';

describe('SalesOrdersComponent', () => {
  let component: SalesOrdersComponent;
  let fixture: ComponentFixture<SalesOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
