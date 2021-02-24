import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categoryList$: Observable<Category[]> = this.categoryService.getAll();

  filterPhrase: string = '';
  filterKey: string = 'name';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

}