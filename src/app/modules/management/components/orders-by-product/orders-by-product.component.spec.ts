import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByProductComponent } from './orders-by-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

fdescribe('OrdersByProductComponent', () => {
  let component: OrdersByProductComponent;
  let fixture: ComponentFixture<OrdersByProductComponent>;

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
      declarations: [ OrdersByProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersByProductComponent);
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
