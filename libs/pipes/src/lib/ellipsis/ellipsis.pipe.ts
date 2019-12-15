import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(str: string, strLength: number = 250) {
    let withoutHtml = '';
    if (str) {
      withoutHtml = str.replace(/(<([^>]+)>)/gi, '');

      if (str.length >= strLength) {
        return `${withoutHtml.slice(0, strLength)}...`;
      }
    }
    return withoutHtml;
  }
}
