import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFormEditComponent } from './text-form-edit.component';

describe('TextFormEditComponent', () => {
  let component: TextFormEditComponent;
  let fixture: ComponentFixture<TextFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFormEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
