import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ITableCol, ConfigService } from 'src/app/services/config.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  title: string = '';
  id: number = 0;
  product: Product = new Product();
  updating: boolean = false;
  cols: ITableCol[] = this.configService.tableColsProductList;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
    ) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(
        params =>{
          if(params.id == 0){
            this.title = 'Create New Product';
            this.product = new Product();
          }
          else
            this.productService.getOneById(params.id).subscribe(
              item => {
                this.id = params.id;
                this.title = 'Edit this Product';
                this.product = item;
              })
        }
      )
    }

    onFormSubmit(form: NgForm, element: Product): void {
      try {
        if (element.id == 0) {
          this.productService.create(element).subscribe(
            () => this.router.navigate(['/products'])
          );
          // toaster üzenet sikeres létrehozásról
          this.configService.showSuccess('Created successfuly.', 'New Product');
        }
        else {
          this.productService.update(element).subscribe(
            () => this.router.navigate(['/products'])
          );
          // toaster üzenet sikeres módosításról
          this.configService.showSuccess('Updated successfuly.', `Product #${ element.id}`);
        }
      } catch (error) {
        // toaster üzenet hibáról
        this.configService.showError('Something went wrong .', `Product editor`);
      }
    }

}
