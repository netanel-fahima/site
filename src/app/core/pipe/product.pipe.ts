import {Pipe, PipeTransform} from '@angular/core';
import * as productActions from '../store/actions';
import {EntityType} from '../store/actions';
import {Store} from '@ngrx/store';

@Pipe({
  name: 'productFilter'
})
export class ProductPipe implements PipeTransform {
  loaded: boolean;

  constructor(private store: Store) {
  }

  transform(products: any[], ...args: any[]): unknown {
    const searchString: string = args?.[0];
    if (!this.loaded && searchString?.length > 2) {
      this.store.dispatch(new productActions.Load(EntityType.Products, {}));
      this.loaded = true;
    }
    if (searchString.length === 0) {
      this.loaded = false;
    }
    if (products != null) {
      return products.filter(value => value.name.indexOf(searchString) >= 0 && !!searchString);
    }
    return products;
  }

}
