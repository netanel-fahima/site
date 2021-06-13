import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'byOrder'
})
export class ByOrderPipe implements PipeTransform {

  transform(value: any[], [name]: any): any[] {
    return value?.sort((a, b) => a[name] > b[name] ? 1 : a[name] === b[name] ? 0 : -1) || [];
  }

}
