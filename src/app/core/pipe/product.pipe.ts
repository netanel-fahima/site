import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductPipe implements PipeTransform {

  transform(products: any[], ...args: unknown[]): unknown {
    if (products != null) {
      return products.filter(value => value.title.indexOf(args[0]) >= 0 && !!args[0] );
    }
    return products;
  }

}
