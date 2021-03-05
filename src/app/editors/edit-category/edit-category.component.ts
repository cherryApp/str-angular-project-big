import { Category } from './../../model/category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'app/services/category.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryIdFromRoute: number=0;
  currentCategory: Category=new Category();
  

  constructor(private route: ActivatedRoute,
               private router: Router,
               private categoryService: CategoryService) {
                
                }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.categoryIdFromRoute = Number(routeParams.get('id'));
   
    this.getCurrentCategory(this.categoryIdFromRoute);
       
  }
  getCurrentCategory(id: number): void{
    this.categoryService.get(this.categoryIdFromRoute).subscribe(
      value=> this.currentCategory=value,
      error=>console.error(Error),
      ()=>console.log("No connection")
    );    
  }
  onFormSubmit(form: NgForm): void{
    this.currentCategory=form.value;
    this.currentCategory.id=this.categoryIdFromRoute;
    if(this.categoryIdFromRoute>0){
      this.categoryService.update(form.value).subscribe(
        ()=>this.router.navigateByUrl('/category-list')
        );
      }else{
        this.categoryService.create(this.currentCategory);
          this.router.navigateByUrl('category-list');          
         
    }
  }
  backToCategory(){
    this.router.navigateByUrl('category-list');
  }
  

}
