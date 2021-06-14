import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'byOrder'
})
export class ByOrderPipe implements PipeTransform {

  transform(value: any[], [name, asc]: any): any[] {
    return value?.sort((a, b) => a[name] > b[name] ? asc ? 0 : 1 : a[name] === b[name] ? asc ? 1 : 0 : -1) || [];
  }

}
