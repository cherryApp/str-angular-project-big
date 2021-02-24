import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();
  productId: number = 0;
  updating: boolean = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.productId = params.id);
    this.productService.getOne(this.productId).subscribe(product => this.product = product);
  }

  setProductToDatabase(product: Product): void {
    this.updating = true;
    if (product.id === 0) {
      this.productService.create(product).subscribe(
        () => {
          this.toastr.success('Sikeres termék létrehozás!', 'Siker!', { timeOut: 3000 });
          this.updating = false;
          this.router.navigate(['product']);
        },
        error => this.toastr.error('Hiba a termék létrehozásakor!', 'Hiba!', { timeOut: 3000 })
      )
    }
    else {
      this.productService.update(product).subscribe(
        () => {
          this.toastr.success('Sikeresen frissítetted a terméket!', 'Siker!', { timeOut: 3000 });
          this.updating = false;
          this.router.navigate(['product']);
        },
        error => this.toastr.error('Hiba történt a termék frissítésekor!', 'Hiba!', { timeOut: 3000 })
      )
    }
  }
}
