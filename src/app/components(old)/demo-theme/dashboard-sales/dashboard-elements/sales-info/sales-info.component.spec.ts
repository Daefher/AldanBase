import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInfoComponent } from './sales-info.component';

describe('SalesInfoComponent', () => {
  let component: SalesInfoComponent;
  let fixture: ComponentFixture<SalesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
