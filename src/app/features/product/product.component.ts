import {AfterViewChecked, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Init} from '../../../assets/js/init';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {EntityService} from '../../core/store/entity.service';
import {select, Store} from '@ngrx/store';
import * as productActions from '../../core/store/actions';
import {EntityType} from '../../core/store/actions';
import {delay, filter, first, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {getImageName} from './utils/productUtil';
import {of} from 'rxjs/internal/observable/of';
import {ProductDetails} from './product-details.service';
import * as fromProduct from '../../core/store';
import {AutoUnsub} from '../../core/utils/auto-unsub';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
@AutoUnsub()
export class ProductComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('dialog', {static: true}) dialog: ProductDialogComponent;

  public products$: any;
  category = null;
  public loaded$: Observable<boolean>;
  private sub: Subscription;

  constructor(private store: Store, public data: EntityService, public route: ActivatedRoute, public router: Router,
              private detail: ProductDetails) {

    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        const category = route.snapshot.queryParamMap.get('category');
        let payload = {
          per_page: '100'
        };
        if (category) {
          payload = {...payload, ...{category}};
        }
        this.store.dispatch(new productActions.Load(EntityType.Products, payload));
        this.loaded$ = this.store.pipe(select(fromProduct.getLoaded, {cmd: EntityType.Products}));
        return this.loaded$;
      }),
      filter(value => !value),
      switchMap(params => {
        return this.data.products$.pipe(
          filter(value => value && !!value.length));
      })).subscribe(value => {
      this.products$ = value;
    });

  }

  ngOnInit(): void {

  }


  ngAfterViewChecked(): void {
    Init.first();
  }

  getImage(product: any, options: object): string {
    const src = product.images?.[0]?.name ? this.detail.getImage(product.images?.[0].name, options) : 'sample';
    console.log(src);
    return src;
  }


  addToCart(product: any): void {
    if (!!product.attributes.length) {
      alert('כנסי למוצר ובחרי מאפייני מוצר');
      return;
    }

    this.store.dispatch(new productActions.AddVisual(EntityType.Carts, {product: {...product, parentId: product.id}, quantity: 1}));
    Init.offcanvasOpen();
  }


  openDialog(product: any): void {
    this.dialog.open(of(product));
  }

  ngOnDestroy(): void {
  }

  addToWithList(product: any): void {
    this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
    Init.offcanvasOpenWishlist();
  }

  done(): void {
    Init.filterToggle();
    Init.isotopeFilter();
    Init.isotopeGrid();
    Init.columnToggle();
    Init.addWishList();
  }
}
