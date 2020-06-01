import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parse'
})
export class ParsePipe implements PipeTransform {
  transform(value: any): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  }
}
