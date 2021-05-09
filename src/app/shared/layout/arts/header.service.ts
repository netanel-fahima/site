import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {EntityService} from '../../../core/store/entity.service';
import {Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public categoriesParent$: Observable<any[]>;
  public categoriesChilds$: Observable<any[]>;

  constructor(public data: EntityService, private router: Router) {
    this.categoriesParent$ = this.data.categories$
      .pipe(
        filter(a => !!a),
        switchMap((ca) => {
          return of(ca.filter(c => !c.parent));
        })
      );

    this.categoriesChilds$ = this.data.categories$
      .pipe(
        filter(a => !!a),
        switchMap((ca) => {
          return of(ca.filter(c => !!c.parent));
        })
      );
  }

  hadChildren(async: any[], id: number): boolean {
    return async.find((ca) => {
      return ca.parent === id;
    });
  }

  navigateToProducts(category: any): string {
    return '/#product?category=' + category.id ;
  }
}
