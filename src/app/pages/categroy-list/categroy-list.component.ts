import { Category, CategoryAttributes } from './../../model/category';
import { CategoryService ,ColumnSortOrder} from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-categroy-list',
  templateUrl: './categroy-list.component.html',
  styleUrls: ['./categroy-list.component.css']
})
export class CategroyListComponent implements OnInit {

  categoryList$: BehaviorSubject<Category[]> = this.categoryService.list$;

  phrase: string = '';
  filterKey = 'id';

  sorterKey: string ='';

  attributes = new CategoryAttributes();

  constructor( private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll();
  }
  onDelete(category: Category): void {
    this.categoryService.remove(category);
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onChangeKey(event: Event): void {
    this.filterKey = (event.target as HTMLInputElement).value;
  }

  setDefault(key): boolean {
    return key === "id" ? true : false;
  }
  
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
  onColumnSelect(key: string): void {
    this.sorterKey = key;
    let clicked = true;
    
    if (this.sortOrder[key] === "none" && clicked) {
      this.eraseSortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    if (this.sortOrder[key] === "ascending" && clicked) {
      this.eraseSortDirections();
      this.sortOrder[key] = "descending"
      clicked = false;
    }

    if (this.sortOrder[key] === "descending" && clicked) {
      this.eraseSortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    this.sortDirection = this.sortOrder[key];
    console.log(this.sortDirection);
  }
    eraseSortDirections(): void {
      for (let key in this.sortOrder) {
        this.sortOrder[key] = "none";
      }
    }
    
    sortDirection = "none";
    
    sortOrder = new ColumnSortOrder();
}
