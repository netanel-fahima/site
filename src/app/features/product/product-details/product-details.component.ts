import {Component, OnDestroy, OnInit} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {ActivatedRoute} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {ProductDetails} from '../product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, public product: ProductDetails) {
  }

  ngOnInit(): void {
    this.product.mainProduct = this.product.product =
      this.route.queryParams.pipe(
        switchMap(params => {
          const p = {
            id: params.id || ''
          };
          const local = localStorage.getItem('product');
          if (p.id !== local) {
            localStorage.setItem('product', p.id);
            if (local) {
              window.location.reload();
              return of(null);
            }
          }
          return this.product.data.products$.pipe(
            filter(value => !!value),
            switchMap((products) =>
              of(products.find((product) => product.id === +p.id)))
          );
        }));

    this.product.setVariations();
  }

  loads(product): void {
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
