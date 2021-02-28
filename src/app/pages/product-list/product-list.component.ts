import { KeyValue } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Category, CategoryAttributes } from 'app/model/category';
import { Product, ProductAttributes, ProductSummaryData } from 'app/model/product';
import { CategoryService } from 'app/services/category.service';
import { ColumnSortOrder, ProductService } from 'app/services/product.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product = new Product();

  setProducttoDelete(product: Product): void {
    this.product = product;
    $('#confirmationDialog').on('shown.bs.modal', function () {
      $('#cancelButton').trigger('focus')
    })
  }

  category = new Category();
  category$ = new Observable<Category>();
  categoryAttributes = new CategoryAttributes();

  getCategory(id: number) {
    this.category$ = this.categoryService.get(id)
    this.category$.forEach(item => this.category = item);
  }

  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  updating: boolean = true

  phrase: string = '';
  filterKey = 'name';

  sorterKey: string = '';

  attributes = new ProductAttributes();

  constructor(private productService: ProductService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.productService.getAll();
    this.updatingValues();
  }

  updatingValues() {
    this.productList$.subscribe(item => {
      if (item.length > 0) {
        this.updating = false;
      }
      this.getData(item);
    })

  }

  onDelete(product: Product): void {
    this.productService.remove(product);
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onChangeKey(event: Event): void {
    if (this.filterKey === "featured" || this.filterKey === "active") {
      this.phrase = "";
      (<HTMLInputElement>document.getElementById("phrase")).value = "";
    }
    this.filterKey = (event.target as HTMLInputElement).value;
    if (this.filterKey === "featured" || this.filterKey === "active") { this.phrase = "true" }
  }

  setDefault(key): boolean {
    return key === "name" ? true : false;
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  onColumnSelect(key: string): void {
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

  scroll(id: string) {
    const elmnt = document.getElementById(id);
    elmnt.scrollIntoView(false);
  }

  //variables and functions for summaries//

  productList: Product[] = [];
  productSummaryData = new ProductSummaryData();

  getData(products: Product[]): void {
    this.productList = products;
    for (let i = 0; i<this.productList.length; i++)
    {
      this.productSummaryData.totalProducts++
      this.productSummaryData.totalItems = this.productSummaryData.totalItems + this.productList[i].stock
      this.productSummaryData.totalValue = this.productSummaryData.totalValue + (this.productList[i].price*this.productList[i].stock)
      let category = Number(this.productList[i].catID)-1
      this.productSummaryData.totalinCategories[category]++;
      if (this.productList[i].active) {
        this.productSummaryData.totalActive++
      }
      if (this.productList[i].featured) {
        this.productSummaryData.totalFeatured++
      }
    }
    console.log(this.productSummaryData);
  }
}
