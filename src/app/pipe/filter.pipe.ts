import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] | null, phrase: string, key: string, subkey: string = '', pagination: any = {}): any[] | null {
    if (!Array.isArray(value) || !phrase || !key) {
      if(Array.isArray(value)){
        this.refreshPagination(pagination, value.length);
      }
      return value;
    }

    let arr = [];
    if (key === 'id' || key === 'price' || key === 'catID' || key === 'sotck') {
      arr = value.filter(item => item[key] == phrase);
    } else  {
      phrase = ('' + phrase).toLowerCase();
      arr = !subkey?
                value.filter(item => ('' + item[key]).toLowerCase().includes(phrase as string) ):
                value.filter(item => ('' + item[subkey][key]).toLowerCase().includes(phrase as string) );
    }
    this.refreshPagination(pagination, arr.length);
    return arr;
  }

  refreshPagination(pagination: any, length: number): void {
    setTimeout(() => {
      pagination.itemCount = length;
      pagination.computePageParams();
      pagination.page = 1;
    });
  }
}

