import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-listing-product',
  templateUrl: './listing-product.component.html',
  styleUrls: ['./listing-product.component.scss']
})
export class ListingProductComponent implements OnInit {


  productList: BehaviorSubject<Product[]> = this.productService.list$;
  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }


  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new Product());


  ngOnInit(): void {
    this.productService.getAll();
  }

  onRemove(product: Product): void {
    this.productService.remove(product.id),
      this.router.navigate([''])
  }
  irany: boolean = false;
  columnKey: string = '';
  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.irany = !this.irany;
  }

  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
  phrase: string = '';



}