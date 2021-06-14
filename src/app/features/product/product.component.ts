import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Init} from '../../../assets/js/init';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {EntityService} from '../../core/store/entity.service';
import {select, Store} from '@ngrx/store';
import * as productActions from '../../core/store/actions';
import {EntityType} from '../../core/store/actions';
import {filter, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
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
  private page = 1;
  private lastScroll = 0;

  constructor(private store: Store, public data: EntityService, public route: ActivatedRoute, public router: Router,
              private detail: ProductDetails) {

    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        const category = route.snapshot.queryParamMap.get('category');
        const pageS = route.snapshot.queryParamMap.get('page');
        const page = pageS ? Number(pageS) : 1;
        let payload = {
          per_page: '20',
          page
        };
        if (category) {
          payload = {...payload, ...{category}};
        }
        this.store.dispatch(new productActions.Load(EntityType.Products, payload));
        this.category = category;
        this.loaded$ = this.store.pipe(select(fromProduct.getLoaded, {cmd: EntityType.Products}));
        return this.loaded$;
      }),
      filter(value => !value),
      switchMap(params => {
        return this.data.products$.pipe(
          filter(value => value && !!value.length)
        );
      })).subscribe(value => {
      Init.offcanvasClose();
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

  addToWithList(product: any, $event: MouseEvent): void {
    $event.preventDefault();
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


  nextPage($event: MouseEvent): void {
    $event.preventDefault();
    const div = document.querySelector('.learts-mt-70');
    window.scrollTo({top: 0});
    const pageS = this.route.snapshot.queryParamMap.get('page');
    const page = pageS ? Number(pageS) : 1;
    const category = this.route.snapshot.queryParamMap.get('category');
    this.router.navigateByUrl(`product?page=${page + 1}${this.category ? '&category=' + category : ''}`);
  }

  pevPage($event: MouseEvent): void {
    $event.preventDefault();
    const div = document.querySelector('.learts-mt-70');
    window.scrollTo({top: 0});
    const pageS = this.route.snapshot.queryParamMap.get('page');
    const page = pageS ? Number(pageS) : 2;
    const category = this.route.snapshot.queryParamMap.get('category');
    this.router.navigateByUrl(`product?page=${page - 1}${category ? '&category=' + category : ''}`);
  }

  hasNext(): boolean {
    return this.products$.length === 20;
  }

  hasPrev(): boolean {
    const pageS = this.route.snapshot.queryParamMap.get('page');
    return !!pageS && Number(pageS) > 1;
  }
}


