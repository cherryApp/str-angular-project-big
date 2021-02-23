import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() productId: number = 0;

  product: Product = new Product();
  updating: boolean = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getOne(this.productId).subscribe(product => this.product = product);
  }

  onUpdate(product: Product): void {
    this.updating = true;
    this.productService.update(product).subscribe(
      () => {
        this.toastr.success('Sikeresen frissítetted a terméket!', 'Siker!', { timeOut: 3000 });
        this.updating = false;
        this.router.navigate(['']);
      },
      error => this.toastr.error('Hiba történt frissítéskor!', 'Hiba!', { timeOut: 3000 })
    )
  }
}
