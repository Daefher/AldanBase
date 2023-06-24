import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartComponent } from './create-part.component';

describe('CreatePartComponent', () => {
  let component: CreatePartComponent;
  let fixture: ComponentFixture<CreatePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
