import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/models/bill';
import { BillService } from 'src/app/services/bill.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {

  bill: Bill = new Bill();
  updating: boolean = false;

  constructor(
    private billService: BillService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(
        params =>
          this.billService.getOneById(params.id).subscribe(
            bill => {
              this.bill = bill || new Bill();
            }
          )
      );
    }

  onFormSubmit(form: NgForm): void {
      this.updating = true;
      this.billService.update(this.bill).subscribe(
        () =>{}
        );
        this.router.navigate(['bills'])
      }
}
