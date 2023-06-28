import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsTableComponent } from './admin-products-table.component';

describe('AdminProductsTableComponent', () => {
  let component: AdminProductsTableComponent;
  let fixture: ComponentFixture<AdminProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
