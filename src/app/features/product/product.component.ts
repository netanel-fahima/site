import {AfterViewChecked, Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {Meta} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
@AutoUnsub()
export class ProductComponent implements OnInit, AfterViewChecked, OnDestroy {

  private page = 1;
  private perPage = 20;
  public loadingProductNext$: Observable<boolean>;

  constructor(private store: Store, public data: EntityService, public route: ActivatedRoute, public router: Router,
              private detail: ProductDetails, private meta: Meta) {

    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        const category = route.snapshot.queryParamMap.get('category');
        this.page = 1;
        let payload = {
          per_page: this.perPage,
          page: this.page
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
      this.products$.forEach(p => {
        this.meta.addTag({
          name: 'Description',
          content: `Product: ${p.name},Price ₪${p.price},Tags: ${p.tags.join(' ,')},`
        });
      });

      Init.first();
    });

    this.loadingProductNext$ = this.store.pipe(select(fromProduct.getLoaded, {cmd: 'nextProducts'}));
  }

  @ViewChild('dialog', {static: true}) dialog: ProductDialogComponent;
  private ones = 1;


  public products$: any;
  category = null;
  public loaded$: Observable<boolean>;
  private sub: Subscription;

  scrolled = 0;

  ngOnInit(): void {

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

  @HostListener('unloaded')
  ngOnDestroy(): void {
  }

  addToWithList(product: any, $event: MouseEvent): void {
    $event.preventDefault();
    this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
    Init.offcanvasOpenWishlist();
  }


  ngAfterViewChecked(): void {
    this.done();
  }

  done(): void {
    if (this.ones < 10) {
      console.log('done');
      Init.filterToggle();
      Init.isotopeFilter();
      /*
            Init.isotopeGrid();
      */
      Init.columnToggle();
      Init.addWishList();
      this.ones++;
    }
  }


  nextPage($event: MouseEvent): void {
    $event.preventDefault();
    const category = this.route.snapshot.queryParamMap.get('category');
    let payload = {
      per_page: this.perPage,
      page: ++this.page
    };
    if (category) {
      payload = {...payload, ...{category}};
    }
    this.store.dispatch(new productActions.NextPage(EntityType.Products, payload));
  }

  pevPage($event: MouseEvent): void {
    $event.preventDefault();
    const div = document.querySelector('.learts-mt-70');
    // window.scrollTo({top: 0});
    const pageS = this.route.snapshot.queryParamMap.get('page');
    const page = pageS ? Number(pageS) : 2;
    const category = this.route.snapshot.queryParamMap.get('category');
    this.router.navigateByUrl(`product?page=${page - 1}${category ? '&category=' + category : ''}`);
  }

  hasNext(): boolean {
    return this.products$.length % 20 === 0;
  }

  hasPrev(): boolean {
    const pageS = this.route.snapshot.queryParamMap.get('page');
    return !!pageS && Number(pageS) > 1;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event): void {
    const divY = $('.btn--next-page')?.get(0)?.getBoundingClientRect().top;
    if (divY && divY <= window.innerHeight - 120) {
      this.scrolled = 1;
    }
    else {
      this.scrolled = 0;
    }
  }

}


