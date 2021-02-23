import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[] | null, key: string): any[] | null {
    if (!Array.isArray(value) || key === '') {
      return value;
    }

    return value.sort(
      function (a: any, b: any): any {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
          return a[key] - b[key];
        } else {
          const strItemA: string = ('' + a[key]).toLowerCase();
          const strItemB: string = ('' + b[key]).toLowerCase();
          return strItemA.localeCompare(strItemB);
        }
      }
    )
  }

}
