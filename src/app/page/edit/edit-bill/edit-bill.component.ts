import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';


@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {

  @Input() id: number = 0; 
  updating: boolean = false;
  bill: Bill = new Bill();

  constructor(
    private activatedRoute: ActivatedRoute,
    private billService: BillService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.id = params.id);
    this.billService.get(this.id).subscribe(bill => this.bill = bill);
  }

  onUpdate(bill: Bill): void {
    this.updating = true;
    if (bill.id === 0) {
      this.billService.create(bill).subscribe(
        () => {
          this.toastr.success('Sikeres számla létrehozás!', 'Siker!', { timeOut: 3000 });
          this.updating = false;
          this.router.navigate(['bills']);
        },
        error => this.toastr.error('Hiba a számla létrehozásakor!', 'Hiba!', { timeOut: 3000 })
      )
    } else {
      this.billService.update(bill).subscribe(
        () => {
          this.toastr.success('Sikeresen frissítetted a számlát!', 'Siker!', { timeOut: 3000 });
          this.updating = false;
          this.router.navigate(['bills']);
        },
        error => this.toastr.error('Hiba történt a számla frissítésekor!', 'Hiba!', { timeOut: 3000 })
      )
    }
  }

}
