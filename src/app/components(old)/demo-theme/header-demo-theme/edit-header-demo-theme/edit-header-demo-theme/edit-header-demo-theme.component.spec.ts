import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeaderDemoThemeComponent } from './edit-header-demo-theme.component';

describe('EditHeaderDemoThemeComponent', () => {
  let component: EditHeaderDemoThemeComponent;
  let fixture: ComponentFixture<EditHeaderDemoThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHeaderDemoThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHeaderDemoThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
