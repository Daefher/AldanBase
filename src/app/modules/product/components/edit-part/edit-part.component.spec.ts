import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartComponent } from './edit-part.component';

describe('EditPartComponent', () => {
  let component: EditPartComponent;
  let fixture: ComponentFixture<EditPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
