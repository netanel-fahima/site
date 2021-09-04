import {Component, OnDestroy, OnInit} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {ActivatedRoute} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {ProductDetails} from '../product-details.service';
import * as productActions from '../../../core/store/actions';
import {EntityType} from '../../../core/store/actions';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {Subscription} from 'rxjs';
import {AutoUnsub} from '../../../core/utils/auto-unsub';
import * as fromProduct from '../../../core/store';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

@AutoUnsub()
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public loaded$: Observable<boolean>;
  private sub: Subscription;
  private product$: Observable<any>;

  constructor(private store: Store, private route: ActivatedRoute, public product: ProductDetails, private meta: Meta) {
    this.product$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Product}));
  }

  ngOnInit(): void {
    this.sub = this.route.queryParams.pipe(
      switchMap(params => {
        const p = {
          id: params.id || '',
          per_page: '1'
        };
        this.store.dispatch(new productActions.Read(EntityType.Product, p));
        this.loaded$ = this.store.pipe(select(fromProduct.getLoaded, {cmd: EntityType.Product}));
        return this.loaded$;
      }),
      filter(value => !value),
      switchMap(params => {
        return this.product$.pipe(
          filter(value => value && !!value.length),
          switchMap((products) =>
            of(products?.[0])
          ));
      })).subscribe(product => {

      this.meta.addTag({
        name: 'Description',
        content: `Product: ${product.name},Price ₪${product.price},Tags: ${product.tags.join(' ,')},`
      });

      this.product.mainProduct = this.product.product = of(product);
      this.product.clear();
      this.product.setVariations();
      Init.offcanvasClose();
    });


  }

  loads(product): void {
    this.product.err = '';
    Init.first();
    Init.qtyBtn();
    this.setImges(this.product.getImages(product));
    Init.productZoom(this.product.getImages(product).map(img => {
      return {src: this.product.getImage(img.name, {height: 1100, width: 700, crop: 'fill'})};
    }));
    if (this.product.getImages(product).length > 1) {
      Init.productGallerySlider();
    }
  }

  setImges(images): void {
    const imgs = images.map(img => {
      return {src: this.product.getImage(img.name, {height: 1100, width: 700, crop: 'fill'}), h: 1100, w: 700};
    });
    Init.galleryPopup(imgs);
  }

  ngOnDestroy(): void {
  }


}
