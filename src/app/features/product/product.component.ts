import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Init} from '../../../assets/js/init';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EntityService} from '../../core/store/entity.service';
import {Store} from '@ngrx/store';
import * as productActions from '../../core/store/actions';
import {EntityType} from '../../core/store/actions';
import {delay, filter, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {getImageName} from './utils/productUtil';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('dialog', {static: true}) dialog: ProductDialogComponent;

  public products$: Observable<any>;
  category = null;

  constructor(private store: Store, public data: EntityService, public route: ActivatedRoute, public router: Router) {

    this.products$ = this.route.queryParams.pipe(
      switchMap(params => {
        const filters = {
          categoryId: params.category || '',
        };

        const local = localStorage.getItem('category');
        if (filters.categoryId !== local) {
          localStorage.setItem('category', filters.categoryId);
          if (local) {
            window.location.reload();
            return of([]);
          }
        }
        return this.data.products$.pipe(
          filter(value => !!value),
          map((products) => {
            if (filters.categoryId) {
              const pp = products.filter(product => {
                return product.categories.find(c => {
                  return c.id === +filters.categoryId;
                });
              });
              console.log('categoryId', filters.categoryId);
              return pp;
            }
            else {
              return products;
            }
          }));
      }));

  }

  ngOnInit(): void {

  }


  ngAfterViewChecked(): void {
    Init.first();

    this.products$
      .pipe(delay(100))
      .subscribe(() => {
        Init.filterToggle();
        Init.isotopeFilter();
        Init.isotopeGrid();
        Init.columnToggle();
        Init.addWishList();
        // Init.quickViewModal();
      });
  }

  getImage(product: any): string {
    const src = product.images?.[0].src ? getImageName(product.images?.[0].src) : 'assets/images/product/s328/product-17.jpg';
    console.log(src);
    return src;
  }

  addToCart(product: any): void {
    this.store.dispatch(new productActions.AddVisual(EntityType.Carts, {product, quantity: 1}));
    Init.offcanvasOpen();
  }


  openDialog(product: any): void {
    this.dialog.product = of(product);
    this.dialog.open();
  }

  ngOnDestroy(): void {
  }

  addToWithList(product: any): void {
    this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
    Init.offcanvasOpenWishlist();
  }
}
