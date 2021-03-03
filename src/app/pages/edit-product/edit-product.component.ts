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
      params =>
      this.productService.getOneById(params.id).subscribe(
        product => {
          this.product = product || new Product();
        }
      )
    );
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;
    this.productService.update(this.product).subscribe(
      () => this.router.navigate(['products'])
    );
  }

}
