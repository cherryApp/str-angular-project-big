import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showHTMLMessage(message: string, title: string, timespan: number){
    this.toastr.success(message, title, {
      timeOut :  timespan
    })
}
}
