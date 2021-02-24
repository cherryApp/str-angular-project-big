import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[] | null, key: string, sortOrder: string, subkey: string = ''): any[] | null {
    if (!Array.isArray(value) || key === '') {
      return value;
    }
    
    if (sortOrder === "descending") {

      return value.sort(
        function (a: any, b: any): any {
          const a_key = !subkey? a[key]: a[subkey][key];
          const b_key = !subkey? b[key]: b[subkey][key];
          
          if (typeof a_key === 'number' && typeof b_key === 'number') {
            return b_key - a_key;
          } else {
            const strItemA: string = ('' + a_key).toLowerCase();
            const strItemB: string = ('' + b_key).toLowerCase();
            return strItemB.localeCompare(strItemA);
          }
        }
      )

    } else {

      return value.sort(
        function (a: any, b: any): any {
          const a_key = !subkey? a[key]: a[subkey][key];
          const b_key = !subkey? b[key]: b[subkey][key];

          if (typeof a_key === 'number' && typeof b_key === 'number') {
            return a_key - b_key;
            
          } else {
            const strItemA: string = ('' + a_key).toLowerCase();
            const strItemB: string = ('' + b_key).toLowerCase();
            return strItemA.localeCompare(strItemB);
          }
        }
      )
    }
  }
}
