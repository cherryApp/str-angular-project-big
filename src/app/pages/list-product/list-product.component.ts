import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ConfigService, ITableCol } from 'src/app/services/config.service';
import { ProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  productProperties: { count: number } = {
    count: 0,
  };

  cols: ITableCol[] = this.configService.tableColsProductList;

  filterPhrase: string = '';
  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new Product());
  sorterDirection: number = 1;
  selectedItemToDelete: Product = new Product();
  sortby: string = '';
  waiting = true;
  colspan: number = this.cols.length + 1;
  statProductscription: Subscription = new Subscription();
  statProductsText: string = '';

  // Paging
  firstItem: number = 0;
  lastItem: number = 0;
  pages: number = 0;
  itemsPerPage:  number = 10;
  currentPage: number = 1;

  productList$: Observable<Product[]> = this.productService.productList$.pipe(
    tap(products => {
      this.productProperties.count = products.length;
      this.firstItem =  (this.currentPage - 1) * this.itemsPerPage;
      this.lastItem =  this.firstItem + this.itemsPerPage;
      this.pages = Math.ceil(this.productProperties.count / this.itemsPerPage);
    })
  );

  constructor(
    private productService: ProductService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
    let time = (Math.floor(Math.random() * 4) + 1) * 1000;
    this.productList$.subscribe(
      () => setTimeout(() => { this.waiting = false }, time)
    );
    this.statProductscription = this.productService.productStats$.subscribe(
      data => {
        this.statProductsText = `<span class="text-info">Selling total ${data.totalNr} products; </span>
        <span class="text-success">${data.activeNr} products are active; </span>
        <span class="text-warning">there are ${data.featuredNr} featured products`;
      }
    );
  }

  // Beállítja az aktuális oldalszámot
  changePageNumber(page: number): void {
    this.currentPage = page;
    this.firstItem =  (this.currentPage - 1) * this.itemsPerPage;
    this.lastItem =  this.firstItem + this.itemsPerPage;
  }

  numSequence(n: number): Array<number> { 
    return Array(n); 
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

  setToDelete(order: Product): void {
    this.selectedItemToDelete = order;
  }

  deleteItem(): void {
    const deletedId: number = this.selectedItemToDelete.id;
    this.productService.remove(this.selectedItemToDelete).subscribe(
      () => {
        this.productService.getAll();
        this.configService.showSuccess('Deleted successfuly.', `Product #${deletedId}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.statProductscription.unsubscribe();
  }

}