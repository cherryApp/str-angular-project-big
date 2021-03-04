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
 
  title: string = '';
  catId: number = 0;
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
      params => {
        if (params.id === 0) {
          this.title = 'Create New Category';
          this.category = new Category();
        }
        else
          this.categoryService.getOneById(params.id).subscribe(
            item => {
              this.catId = params.id;
              this.title = 'Edit this Category';
              this.category = item;
            })
      }
    )
  }
 
  onFormSubmit(form: NgForm, element: Category): void {
    try {
      if (element.id == 0) {
        this.categoryService.create(element).subscribe(
          () => this.router.navigate(['/categories'])
          );
          // toaster üzenet sikeres létrehozásról
          this.configService.showSuccess('Created successfuly.', 'New Category');
        }
        else {
          this.categoryService.update(element).subscribe(
            () => this.router.navigate(['/categories'])
          );
          // toaster üzenet sikeres módosításról
          this.configService.showSuccess('Updated successfuly.', `Category #${ element.id}`);
        }
      } catch (error) {
        // toaster üzenet hibáról
        this.configService.showError('Something went wrong .', `Category editor`);
      }
    }
   
  }
  