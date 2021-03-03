import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: null | any[] , phrase: string, fkey: string): any[] | null  {
    
    if (!Array.isArray(value) || !phrase || !fkey) {
      return value;
    }

    phrase = ('' + phrase).toLowerCase();

    return value.filter( item => {
      const strItem:string = ('' + item[fkey]).toLowerCase();
      return strItem.includes(phrase);
    });
    
  }

}