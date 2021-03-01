import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill, BillAttributes } from 'app/model/bill';
import { BillService } from 'app/services/bill.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css']
})

export class EditBillComponent implements OnInit {

  clicked: boolean = false;

  bill$: Observable<Bill> = this.activatedRoute.params.pipe(
    switchMap(params => this.billService.get(params.id))
  );

  attributes = new BillAttributes();

  constructor(    
    private activatedRoute: ActivatedRoute,
    private billService: BillService,
    private router: Router) { }

  ngOnInit(): void { }

  onUpdate(form: NgForm, bill: Bill): void {
    this.clicked = true;
    this.animateSaveIcon();
    if (bill.id === 0) {
      this.billService.create(bill);
    } else {
      this.billService.update(bill).subscribe(
        ev => this.router.navigate(['bill-list'])
      );
    }
  }

  animateSaveIcon(): void {
    let saveIcon = document.getElementById("saveicon");
    saveIcon.classList.remove("fa-save");
    saveIcon.classList.add("fa-spinner", "fa-pulse");
  }
  
}
