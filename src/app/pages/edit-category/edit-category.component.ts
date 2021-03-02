import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ConfigService, ITableCol } from 'src/app/services/config.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  category: Category = new Category();
  updating: boolean = false;
  cols: ITableCol[] = this.configService.tableColsCategoryList;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.categoryService.get(params.id).subscribe(
          category => {
            this.category = category || new Category();
          }
        )
    );
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;
    this.categoryService.update(this.category).subscribe(
      () => this.router.navigate(['categories'])
    );
  }


}
