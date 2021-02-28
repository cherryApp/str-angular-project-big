import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] | null, phrase: string, key: string, subkey: string = ''): any[] | null {
    if (!Array.isArray(value) || !phrase || !key) {
      return value;
    }

    if (key === 'id' || key === 'price' || key === 'catID' || key === 'sotck') {
      return value.filter(item => item[key] == phrase)
    } else  {
      phrase = ('' + phrase).toLowerCase();
      return !subkey?
                value.filter(item => ('' + item[key]).toLowerCase().includes(phrase as string) ):
                value.filter(item => ('' + item[subkey][key]).toLowerCase().includes(phrase as string) );
    }
  }
}

