import { Component, OnInit } from '@angular/core';
import { ProducserviceService } from '../../service/producservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();

  categories: {id: number, category: string}[] = [
    {id: 0, category: 'Documentary'},
    {id: 1, category: 'Comedy'},
    {id: 2, category: 'Western'},
    {id: 3, category: 'Horror'},
    {id: 4, category: 'Action'},
    {id: 5, category: 'Romance'},
    {id: 6, category: 'Drama'},
    {id: 7, category: 'Sci-Fi'}

  ];

  constructor(
    private productService: ProducserviceService,
    private rout: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.rout.params.subscribe( params => {
      if (params.id != '0') {
        this.productService.get(params.id).forEach( product => {
          this.product = product;
        });
      }

    });

  }

  onSave() {
    if (this.product.id) {

      this.productService.update(this.product).subscribe((p: Product) => {
        this.toastr.success('Sikeres mentés!');
        this.router.navigate(['product']);
      });

    } else {

      this.productService.create(this.product).subscribe((p: Product) => {
        this.toastr.success('Sikeres mentés!');
        this.router.navigate(['product']);
      });

    }
  }

  onTypeSelect(event: Event): void
  {
    const id = (event.target as HTMLInputElement).value;
    const result = this.categories.find(c => c.id == Number(id));
    if (result) {
      this.product.type = result.category;
    }
  }

  ngOnInit(): void {
  }

}
