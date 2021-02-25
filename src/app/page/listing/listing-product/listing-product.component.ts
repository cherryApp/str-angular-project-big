import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listing-product',
  templateUrl: './listing-product.component.html',
  styleUrls: ['./listing-product.component.scss']
})
export class ListingProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private config: ConfigService,
    private toastr: ToastrService,
  ) { }

  productList: BehaviorSubject<Product[]> = this.productService.list$;
  cols: ITableCol[] = this.config.productTableCols;
  phrase: string = '';

  filterKey: string = 'id';
  filterKeys: string[] = Object.keys(new Product());
  currentSelectProperty: string = 'name';
  orderProperties: string[] = Object.keys(new Product());
  sortedOrder = 'ASC';
  sortedColumn = 'id';
  sortedCount = 0;
  column: string = '';
  direction: boolean = false;
  columnKey: string = '';
  firstSorting = true;

  ngOnInit(): void {
    this.productService.getAll();
  }

  onRemove(product: Product): void {
    this.productService.remove(product.id),
      this.router.navigate(['/products']);
    if (product.id === 0) {
      this.productService.create(product).subscribe(
        () => {
          this.toastr.success('Sikeres termék törlése!', 'Törlés!', { timeOut: 3000 });
          this.router.navigate(['products']);
        },
        error => this.toastr.error('Hiba a termék törlésekor!', 'Hiba!', { timeOut: 3000 })
      )
    }
    else {
      this.productService.update(product).subscribe(
        () => {
          this.toastr.success('Sikeresen törölted a terméket!', 'Törlés!', { timeOut: 3000 });
          this.router.navigate(['products']);
        },
        error => this.toastr.error('Hiba történt a termék törlésekor!', 'Hiba!', { timeOut: 3000 })
      )
    }
  }

  onColumnSelect(columnName: string): void {
    if (this.firstSorting) {
      this.sortedOrder = 'ASC';
      this.firstSorting = false;
    }
    else this.sortedOrder == 'ASC' ? this.sortedOrder = 'DESC' : this.sortedOrder = 'ASC';
    this.sortedColumn = columnName;
  }

  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
}