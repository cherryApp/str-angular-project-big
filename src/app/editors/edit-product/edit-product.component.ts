import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/model/category';
import { Product, ProductAttributes } from 'app/model/product';
import { CategoryService } from 'app/services/category.service';
import { ProductService } from 'app/services/product.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  clicked: boolean = false;

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap(params => this.productService.get(params.id))
  );

  categoryList$: BehaviorSubject<Category[]> = this.categoryService.list$;

  attributes = new ProductAttributes();

  constructor(    
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,) { }

  ngOnInit(): void {
    this.categoryService.getAll();
  }

  onUpdate(form: NgForm, product: Product): void {
    this.clicked=true;
    this.animateSaveIcon();
    if (product.id === 0) {
      this.productService.create(product);
    } else {
      this.productService.update(product).subscribe(
        ev => this.router.navigate(['product-list'])
      );
    }
  }
  animateSaveIcon(): void {
    let saveIcon = document.getElementById("saveicon");
    saveIcon.classList.remove("fa-save");
    saveIcon.classList.add("fa-spinner", "fa-pulse");
  }
}
