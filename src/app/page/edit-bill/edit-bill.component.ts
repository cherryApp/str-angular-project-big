import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {

  bill: Bill = new Bill();

  constructor(
    private billService: BillService,
    private rout: ActivatedRoute,
  ) {
    this.rout.params.subscribe( params => {
      this.billService.get(params.id).forEach( order => {
        this.bill = order;
      })
    })
   }

  ngOnInit(): void {}


}
