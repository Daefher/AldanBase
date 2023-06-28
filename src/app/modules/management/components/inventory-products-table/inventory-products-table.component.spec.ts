import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProductsTableComponent } from './inventory-products-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

fdescribe('InventoryProductsTableComponent', () => {
  let component: InventoryProductsTableComponent;
  let fixture: ComponentFixture<InventoryProductsTableComponent>;

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
      declarations: [ InventoryProductsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryProductsTableComponent);
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
