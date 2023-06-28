import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyDialogComponent } from './edit-company-dialog.component';

describe('EditCompanyDialogComponent', () => {
  let component: EditCompanyDialogComponent;
  let fixture: ComponentFixture<EditCompanyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
