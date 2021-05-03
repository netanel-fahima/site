import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Init} from '../../../assets/js/init';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityService} from '../../core/store/entity.service';
import {Store} from '@ngrx/store';
import {EntityType, ProductActions} from '../../core/store/actions';
import * as productActions from '../../core/store/actions';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {getImageName, getImages} from './utils/productUtil';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('dialog', {static: true}) dialog: ProductDialogComponent;

  public products$: Observable<any>;


  constructor(private store: Store, public data: EntityService, public route: ActivatedRoute, public router: Router) {
    const params = this.route.snapshot.queryParams;
    this.products$ = this.data.products$.pipe(
      filter(value => !!value),
      map(products => {
        if (params.category) {
          const pp = products.filter(product => {
            return product.categories.find(c => {
              return c.id === +params.category;
            });
          });
          console.log('pp', pp);
          return pp;
        }
        else {
          return products;
        }
      }));
  }


  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    Init.first();
    this.products$.subscribe((value) => {
      setTimeout(() => {
        Init.filterToggle();
        Init.isotopeFilter();
        Init.isotopeGrid();
        Init.columnToggle();
        Init.addWishList();
        Init.quickViewModal();
      }, 1000);
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
    this.dialog.product = product;
  }

  ngOnDestroy(): void {
  }

  addToWithList(product: any): void {
    this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
    Init.offcanvasOpenWishlist();
  }
}
