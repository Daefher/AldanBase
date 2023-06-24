import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageSectionComponent } from './edit-page-section.component';

describe('EditPageSectionComponent', () => {
  let component: EditPageSectionComponent;
  let fixture: ComponentFixture<EditPageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPageSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
