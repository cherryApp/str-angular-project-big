
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ConfigService, ITableCol } from 'src/app/services/config.service';
import { ProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  productList$: Observable<Product[]> = this.productService.productList$;

  cols: ITableCol[] = this.configService.tableColsProductList;

  filterPhrase: string = '';
  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new Product());
  sorterDirection: number = 1;
  sortby: string = '';
  waiting = true;
  constructor(
    private productService: ProductService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
    let time = (Math.floor(Math.random() * 4) + 1) * 1000;
    this.productList$.subscribe(
      () => setTimeout(() => { this.waiting = false }, time)
    )
  }

  changeOrder(param: string): void {
    if (this.sortby === '' || this.sortby != param) {
      this.sorterDirection = 1;
    }
    if (this.sortby === param) {
      if (this.sorterDirection === 1) this.sorterDirection = 2;
      else this.sorterDirection = 1;
    }
    this.sortby = param;
    let allArrow = document.querySelectorAll('.arrow');
    allArrow.forEach(element => {
      element.classList.remove('arrow__active');
    });
    let allTHead = document.querySelectorAll('.th');
    allTHead.forEach(element => {
      element.classList.remove('th__active');
    });
    document.querySelector('#thead_' + param)?.classList.add('th__active');
    if (this.sorterDirection == 1) document.querySelector('#arrow_up_' + param)?.classList.add('arrow__active');
    else document.querySelector('#arrow_down_' + param)?.classList.add('arrow__active');
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  }

  deleteItem(item: Product): void {
    this.productService.remove(item);
  }

}
