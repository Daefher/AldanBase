import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageSectionComponent } from './create-page-section.component';

describe('CreatePageSectionComponent', () => {
  let component: CreatePageSectionComponent;
  let fixture: ComponentFixture<CreatePageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePageSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
