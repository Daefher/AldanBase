import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAvailableComponent } from './products-available.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

fdescribe('ProductsAvailableComponent', () => {
  let component: ProductsAvailableComponent;
  let fixture: ComponentFixture<ProductsAvailableComponent>;

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
      declarations: [ ProductsAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsAvailableComponent);
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
