  
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

  constructor(
    private productService: ProductService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  changeOrder(param: string): void {
    if (this.sorterDirection === 1)  this.sorterDirection = 2;
    else this.sorterDirection = 1;
    this.sortby = param;
    document.querySelector('#arrow_up_'+param)?.classList.toggle('arrow__active');
    document.querySelector('#arrow_down_'+param)?.classList.toggle('arrow__active');
  }

  originalOrder = (a:any, b:any): number => {
    return 0;
  }

  deleteItem(item: Product): void {
    this.productService.remove(item);
  }

}
