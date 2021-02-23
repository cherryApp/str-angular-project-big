import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] | null, phrase: string, key: string): any[] | null {
    if (!Array.isArray(value) || !phrase || !key) {
      return value;
    }

    if (key === 'id' || key === 'price' || key === 'catID') {
      return value.filter(item => item[key] == phrase)
    } else  {
      phrase = ('' + phrase).toLowerCase();
      return value.filter(item => {
        return ('' + item[key]).toLowerCase().includes((phrase as string));
      })
    }
  }
}

