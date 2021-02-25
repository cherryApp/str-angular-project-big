//Mint list-customer.component.ts//
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService, ITableCol } from 'src/app/services/config.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categoryList$: Observable<Category[]> = this.categoryService.getAll();
  cols: ITableCol[] = this.configService.tableColsCategoryList;

  filterPhrase: string = '';
  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new Category());
  sorterDirection: number = 1;
  sortby: string = '';

  constructor(
    private categoryService: CategoryService,
    private configService: ConfigService,
    ) { }
 
  ngOnInit(): void {
  }

  changeOrder(sortby: string): void {
    this.sortby = sortby;
  }

}