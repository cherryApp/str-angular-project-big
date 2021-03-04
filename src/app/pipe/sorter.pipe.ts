import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})

/*
export class SorterPipe implements PipeTransform {

  transform(list: any[] | null, key: string, ascending: true): any [] | null {

    if (!Array.isArray(list) || !key || !ascending) {
      return list;
    }

    return list.sort(
      function(a, b) {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
          if (ascending == true) {
            return a[key] - b[key];
          }
          return b[key] - a[key];
        } else {
            let columnA = ('' + a[key]).toLowerCase();
            let columnB = ('' + b[key]).toLowerCase();

        if (ascending == true) {
            return columnA.localeCompare(columnB);
        }
      return columnB.localeCompare(columnA);
    };
  });
};
};

*/

export class SorterPipe implements PipeTransform {

/*   transform(list: any[] | null, key: string): any [] | null {

    if (!Array.isArray(list) || !key) {
      return list;
    }

    return list.sort((a, b) =>
    (typeof a[key] === 'number' && typeof b[key] === 'number') ? a[key] - b[key] :
      ('' + a[key]).toLowerCase().localeCompare(('' + b[key]).toLowerCase()))
  }
 */

transform(value: any[] | null, key: string, dir: number = 1): any[] | null {
  if (!Array.isArray(value) || !key) {
    return value;
  }
  return value.sort( (a, b) => {
    let first = a[key];
    let second = b[key];

    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return (a[key] - b[key]) * dir;
    } else {

      if (typeof first === 'object' && typeof second === 'object') {
        first = Object.values(first).join('');
        second = Object.values(second).join('');
      }

      return (
        ('' + first)
          .toLowerCase()
          .localeCompare(
            ('' + second).toLowerCase()
          )
        ) * dir;
    }
  });
}


}

