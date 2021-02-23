import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product, ProductAttributes } from 'app/model/product';
import { ProductService } from 'app/services/product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> = this.productService.list$;

  phrase: string = '';
  filterKey = 'name';

  attributes = new ProductAttributes();


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  onDelete(product: Product): void {
    this.productService.remove(product);
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onChangeKey(event: Event): void {
    this.filterKey = (event.target as HTMLInputElement).value;
  }

  setDefault(key):boolean {
    return key === "name" ? true : false;
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
}
