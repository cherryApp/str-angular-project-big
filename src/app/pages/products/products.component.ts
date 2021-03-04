import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { NotificationService } from 'src/app/service/notification.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

interface IPageBtn {
  page: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  cols: ITableCol[] = this.config.productsTableColumns;
  products$: Observable<Product[]> = this.productService.list$.pipe(
    tap( products => this.productsProperties.count = products.length )
  );

  filterKey: string = '';
  filterKeys: string[] = Object.keys(new Product());

  constructor(
    private config: ConfigService,
    private productService: ProductService,
    private notifyService : NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  product: Product = new Product();

  onUpdate(product: Product): void {

    if (product.id === 0) {
      this.productService.create(product);
    }

    this.productService.update(product);
  }

  onDelete(product: Product): void {
    this.productService.remove(product).subscribe(
      () => this.productService.getAll()
    )
  }

  showHtmlToasterDelete(){
    this.notifyService.showHTMLMessage(`Deleting was successful.`, ``, 3000)
  }

  phrase: string = '';

  searchEvent(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  productsProperties: {count: number} = {
    count: 0,
  };
  pageSize: number = 20;
  pageStart: number = 1;
  currentPage: number = 1;
  get paginator(): IPageBtn[] {
    const pages: IPageBtn[] = [];
    for (let i = 0; i < this.productsProperties.count / this.pageSize && pages.length < 10; i++ ) {
      const page = this.pageStart + i;
      pages.push({page});
    }
    return pages;
  }
  get pageSliceStart(): number {
    const index = this.currentPage - 1;
    return index === 0 ? 0 : (index * this.pageSize);
  }
  get pageSliceEnd(): number {
    return this.pageSliceStart + this.pageSize;
  }

  onPaginate(event: Event, btn: IPageBtn): void {
    event.preventDefault();
    this.currentPage = btn.page;
    this.pageStart = (btn.page - 5) < 1 ? 1 : (btn.page - 5);
  }

  onStepPage(event: Event, step: number): void {
    event.preventDefault();
    this.currentPage += step;
    this.pageStart = (this.currentPage - 5) < 1 ? 1 : (this.currentPage - 5);
  }

  columnKey: string = '';
  sortDir: number = -1;

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.sortDir = this.sortDir * (-1);
  }

  /*
  onSort(key: string): void {
    if (key === this.sorterKey) {
      this.sorterDirection = this.sorterDirection * -1;
    } else {
      this.sorterDirection = 1;
    }
    this.sorterKey = key;
  }
  */
}
