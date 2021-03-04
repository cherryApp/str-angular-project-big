import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bill } from 'src/app/models/bill';
import { BillService } from 'src/app/services/bill.service';
import { ConfigService, ITableCol } from 'src/app/services/config.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {

  title: string = '';
  id: number = 0;
  bill: Bill = new Bill();
  updating: boolean = false;
  cols: ITableCol[] = this.configService.tableColsBillList;

  constructor(
    private billService: BillService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        if(params.id == 0){
          this.title = 'Create New Bill';
          this.bill = new Bill();
        }
        else
          this.billService.getOneById(params.id).subscribe(
            item => {
              this.id = params.id;
              this.title = 'Edit this Bill';
              this.bill = item;
            })
      }
    )
  }

  onFormSubmit(form: NgForm, element: Bill): void {
    try {
      if (element.id == 0) {
        this.billService.create(element).subscribe(
          () => this.router.navigate(['/bills'])
        );
        // toaster üzenet sikeres létrehozásról
        this.configService.showSuccess('Created successfuly.', 'New Bill');
      }
      else {
        this.billService.update(element).subscribe(
          () => this.router.navigate(['/bills'])
        );
        // toaster üzenet sikeres módosításról
        this.configService.showSuccess('Updated successfuly.', `Bill #${ element.id}`);
      }
    } catch (error) {
      // toaster üzenet hibáról
      this.configService.showError('Something went wrong .', `Bill editor`);
    }
  }

}