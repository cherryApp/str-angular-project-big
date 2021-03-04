import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { BillService } from 'src/app/service/bill.service';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {

  fields: ITableCol[] = this.configService.billsTableColumns.filter(column => column.visible);
  updating : boolean = false;
  bill$: Observable<Bill | undefined> = of(new Bill() );

  bill: Bill = new Bill();

  constructor(
    private billService: BillService,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private router: Router,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
    this.activatedRoute.params.subscribe(
      params => {
        console.log(params.id);
        if (params.id == 0) {
          this.bill$ = of( new Bill() );
        } else {
          this.bill$ = this.billService.get(params.id);
        }
      })
  }

  showHtmlToasterUpdate(){
    this.notifyService.showHTMLMessage(`Updating was successful.`, ``, 3000)
  }

  onUpdate(form: NgForm, bill: Bill): void {

    this.updating = true;

    this.billService.update(bill).subscribe(
      () => this.router.navigate(['bills'])
    )
}

}

