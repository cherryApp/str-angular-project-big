import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product, ProductAttributes } from 'app/model/product';
import { ColumnSortOrder, ProductService } from 'app/services/product.service';
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

  sorterKey: string ='';

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
    if (this.filterKey === "featured" || this.filterKey === "active" ) {
      this.phrase = "";
      (<HTMLInputElement>document.getElementById("phrase")).value = "";      
    }
    this.filterKey = (event.target as HTMLInputElement).value;
    if (this.filterKey === "featured" || this.filterKey === "active" ) {this.phrase = "true"}
  }

  setDefault(key):boolean {
    return key === "name" ? true : false;
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  onColumnSelect(key: string) : void {
    this.sorterKey = key;
    let clicked = true;
    
    if (this.sortOrder[key] === "none" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    if (this.sortOrder[key] === "ascending" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "descending"
      clicked = false;
    }

    if (this.sortOrder[key] === "descending" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    this.sortDirection = this.sortOrder[key];
    console.log(this.sortDirection);
  }
  
  erasesortDirections(): void {
    for (let key in this.sortOrder) {
      this.sortOrder[key] = "none";
    }
  }
  
  sortDirection = "none";
  
  sortOrder = new ColumnSortOrder();

}
