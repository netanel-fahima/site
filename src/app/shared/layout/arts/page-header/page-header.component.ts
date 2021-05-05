import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {EntityService} from '../../../../core/store/entity.service';
import {getLocalUser} from '../../../../core/localStore/loadStorage';
import {concatMap, filter, map, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-smart-page-header',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageHeaderComponent {
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

  getUserName(): Observable<string> {
    return getLocalUser() && getLocalUser().username;
  }

  foundChilds(async: any[], id: number): boolean {
    return async.find((ca) => {
      return ca.parent === id;
    });
  }

  routeToProducts(category: any): string {
    return 'product?category=' + category.id;
  }
}

