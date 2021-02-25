import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductAttributes } from 'app/model/product';
import { ProductService } from 'app/services/product.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap(params => this.productService.get(params.id))
  );

  attributes = new ProductAttributes();

  constructor(    
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, product: Product): void {
    if (product.id === 0) {
      this.productService.create(product);
      this.router.navigate(['product-list'])
    } else {
      this.productService.update(product).subscribe(
        ev => this.router.navigate(['product-list'])
      );
    }
  }



}
