import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: null | any[], sortby: string, direction: number): any[] | null {

    if (!Array.isArray(value) || !sortby || !direction) {
      return value;
    }

    if (direction === 1) {
      if (sortby==='') return value;
      else {
        return value.sort( (a, b) => {
          if ( a[sortby] < b[sortby] ){
            return -1;
          }
          if ( a[sortby] > b[sortby] ){
            return 1;
          }
          return 0;
        });
      }
    } else {
      if (sortby==='') return value;
      else {
        return value.sort( (a, b) => {
          if ( a[sortby] > b[sortby] ){
            return -1;
          }
          if ( a[sortby] < b[sortby] ){
            return 1;
          }
          return 0;
        });
      }
    }

  }

}
