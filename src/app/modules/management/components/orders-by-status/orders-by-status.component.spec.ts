import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByStatusComponent } from './orders-by-status.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

fdescribe('OrdersByStatusComponent', () => {
  let component: OrdersByStatusComponent;
  let fixture: ComponentFixture<OrdersByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),    
        MatDialogModule    
      ],
      providers: [
        {
          provide: ToastrService, 
          useValue: ToastrService
        },  
        {
          provide: MatDialogRef,
          useValue: {}
        },      
      ],
      declarations: [ OrdersByStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersByStatusComponent);
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
