import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductsSortPipe } from 'src/app/pipes/productsPipes/products-sort.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';

fdescribe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

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
      declarations: [ ProductListComponent,ProductsSortPipe, SearchFilterPipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
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
