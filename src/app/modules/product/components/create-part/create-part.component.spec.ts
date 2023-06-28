import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartComponent } from './create-part.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

fdescribe('CreatePartComponent', () => {
  let component: CreatePartComponent;
  let fixture: ComponentFixture<CreatePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),        
      ],
      providers: [
        {
          provide: ToastrService, 
          useValue: ToastrService
        },
      ],
      declarations: [ CreatePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
