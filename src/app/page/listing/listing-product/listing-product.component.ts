import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { StatisticsService } from 'src/app/service/statistics.service';
import { NgAnimateScrollService } from 'ng-animate-scroll';

// *********** FOR MODAL
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// ************ FOR MODAL

// FOR LOADING BOX
import { NgxSpinnerService } from "ngx-spinner";

// @ts-ignore
import tableDragger from 'table-dragger';


@Component({
  selector: 'app-listing-product',
  templateUrl: './listing-product.component.html',
  styleUrls: ['./listing-product.component.scss']
})
export class ListingProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private config: ConfigService,
    private toastr: ToastrService,
    private statisticsService: StatisticsService,
    private animateScrollService: NgAnimateScrollService,
    private modalService: NgbModal,
    public spinner: NgxSpinnerService
  ) { }

  scroll(id: string) {
    const elmnt = document.getElementById(id);
    elmnt?.scrollIntoView(false);
  }

    // ***************** FOR MODAL
    closeResult: Boolean = false;
    closeReason = '';
    productToRemove: Product = new Product();
    modalTitle = 'Termék törlése';
    modalText: Array<string> = [
      'Biztosan törölni kívánja a(z) ',
      '(termékszám)',
      '. számú termék adatait?',
      'A termékhez tartozó valamennyi adat véglegesen törlődik!',
      'Visszafordíthatatlan művelet!!!',
    ];
    // ****************** FOR MODAL

  productList: BehaviorSubject<Product[]> = this.productService.list$;
  cols: ITableCol[] = this.config.productTableCols;


  phrase: string = '';
  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new Product());
  currentSelectProperty: string = 'name';
  orderProperties: string[] = Object.keys(new Product());
  sortedOrder = 'ASC';
  sortedColumn = 'id';
  sortedCount = 0;
  column: string = '';
  direction: boolean = false;
  columnKey: string = ''
  firstSorting = true;
  loaded = false;

  numberOfActiveProducts$ = this.statisticsService.numberOfActiveProducts$;
  numberOfAllProducts$ = this.statisticsService.numberOfAllProducts$;
  numberOfFeaturedProducts$ = this.statisticsService.numberOfFeaturedProducts$;

  ngOnInit(): void {
    this.productService.getAll();
    this.statisticsService.subscribeForData();

    // For Table dragger
    const id = document.querySelector('#table');
    tableDragger(id, { mode: 'column', onlyBody: true, animation: 300 });
    
    // FOR LOADING BOX
    this.spinner.show();
    this.productList.subscribe(productList => this.loaded = productList.length ? true : false);
    
  }

  onRemove(product: Product): void {
    this.productService.remove(product).subscribe(
      () => {
        this.toastr.success('Sikeresen törölted a terméket!', 'Törlés!', { timeOut: 3000 });
        this.productService.getAll();
        this.router.navigate(['products']);
      },
      error => this.toastr.error('Hiba történt a termék törlésekor!', 'Hiba!', { timeOut: 3000 })
    )
  }

  onColumnSelect(columnName: string): void {
    if (this.firstSorting) {
      this.sortedOrder = 'ASC';
      this.firstSorting = false;
    }
    else this.sortedOrder == 'ASC' ? this.sortedOrder = 'DESC' : this.sortedOrder = 'ASC';
    this.sortedColumn = columnName;
    this.direction = !this.direction;
  }

  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  // FOR SCROLL ANIMATION
  navigateToHeader(duration?:number): void {
    this.animateScrollService.scrollToElement('top', duration);
  }

  // ************************ FOR MODAL
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = result;
        },
        (reason) => {
          this.closeReason = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  log(product: Product) {
    this.productToRemove = product;
    this.modalText[1] = '' + product.id;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } // ************************

}