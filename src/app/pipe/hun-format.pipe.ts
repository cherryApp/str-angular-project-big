import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hunFormat'
})
export class HunFormatPipe implements PipeTransform {

  transform(value: string | number | null): string | null {
    return value ? `${new Number(value).toLocaleString("hu-HU")}` : null;
  }

}
