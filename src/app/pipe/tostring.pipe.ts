import { isNull } from '@angular/compiler/src/output/output_ast';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tostring',
})
export class TostringPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) return null;

    return '' + value;
  }
}
