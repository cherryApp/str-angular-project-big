import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hunFormat'
})
export class HunFormatPipe implements PipeTransform {

  transform(value: string | number): string {
    return `${new Number(value).toLocaleString("hu-HU")}`;
  }

}
