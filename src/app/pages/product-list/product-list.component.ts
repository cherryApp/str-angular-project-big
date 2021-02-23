import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductService } from 'app/services/product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  productList$: BehaviorSubject<Product[]> = this.productService.list$;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  onDelete(product: Product): void {
    this.productService.remove(product);
}


}
