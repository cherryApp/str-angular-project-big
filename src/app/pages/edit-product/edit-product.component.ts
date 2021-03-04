import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  fields: ITableCol[] = this.configService.productsTableColumns.filter(
    column => column.visible
  );
  updating : boolean = false;
  product$: Observable<Product | undefined> = of(new Product() );
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private router: Router,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
    this.activatedRoute.params.subscribe(
      params => {
        console.log(params.id);
        if (params.id == 0) {
          this.product$ = of( new Product() );
        } else {
          this.product$ = this.productService.get(params.id);
        }
      })
  }


  showHtmlToasterUpdate(){
    this.notifyService.showHTMLMessage(`Updating was successful.`, ``, 3000)
  }

  onUpdate(form: NgForm, product: Product): void {

    this.updating = true;

    this.productService.update(product).subscribe(
      () => this.router.navigate(['products'])
    )
  }

}
