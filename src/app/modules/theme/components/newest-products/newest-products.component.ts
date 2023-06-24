import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyInterface } from 'src/app/interfaces/company-interface';
import { ProductInterface } from 'src/app/interfaces/product-interface';
import { CartService } from 'src/app/services/demo-cart/cart.service';
import { ProductsService } from 'src/app/services/demo-products/products.service';
import * as globals from '../../../../globals';

@Component({
  selector: 'app-newest-products',
  templateUrl: './newest-products.component.html',
  styleUrls: ['./newest-products.component.scss']
})
export class NewestProductsComponent {
  products: ProductInterface[] = [];
  image_path: string;
  company: CompanyInterface;


  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
    if (this.company.companyId != undefined) {
      this.productService.getAllActive(this.company.companyId).subscribe((data: ProductInterface[]) => {
        if (data.length > 4) {
          this.products = data.slice(0, 4);
        } else {
          this.products = data;
        }
      },
        err => {
          this.toastr.error("Error cargar feature productos");
        }
      );
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.company = response.company[0];
      this.image_path = globals.img_path + this.company.companyId + '/';
    });
  }

  //DELETE THIS FUNCTION SHOULD BE ON BACKEND
  //Sort only the products that are not trashed


  addToCart(product: ProductInterface) {
    product.quantity = 1;
    if (this.cartService.addToLSCart(product, false))
      this.toastr.success("¡Product agregado exitosamente!");
    else
      this.toastr.error("Hubo un error al agregar el producto");
  }
}
