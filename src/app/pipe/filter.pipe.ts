@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    value: any,
    key: string,
    phrase: string | number | boolean
  ): Array<any> {
    if (!Array.isArray(value) || !key || !phrase) return value;

    phrase = typeof phrase === 'number' ? phrase : ('' + phrase).toLowerCase();

    return value.filter((item) => {
      if (typeof item[key] === 'number' && typeof phrase === 'number') {
        return item[key] === phrase;
      }

      return ('' + item[key]).toLowerCase().includes(phrase as string);
    });
  }
}
