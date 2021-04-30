import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Init} from '../../../assets/js/init';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {EntityService} from '../../core/store/entity.service';
import {Store} from '@ngrx/store';
import {EntityType, ProductActions} from '../../core/store/actions';
import * as productActions from '../../core/store/actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('dialog', {static: true}) dialog: ProductDialogComponent;

  constructor(private store: Store, public data: EntityService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    /*let params = this.route.snapshot.queryParams;
    if (!!params.category)
      this.data.productAsync = this.data.categoryRest.post({data: {}, cmd: `/${params.category}/products`});
    else {
      this.data.productAsync = this.data.productRest
         .list();
    }*/
  }

  ngAfterViewChecked(): void {
    Init.first();
    this.data.products$.subscribe((value) => {
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

  getImage(str: any): string {
    const imgs = [];
    const regex = /\"(?<Protocol>\w+):\/\/(?<Domain>[\w.]+\/?)\S*\"/gm;
    let m: RegExpExecArray;
    // tslint:disable-next-line:no-conditional-assignment
    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // @ts-ignore
      imgs.push(m?.[0].replaceAll('"', ''));
      // The result can be accessed through the `m`-variable
    }
    if (imgs.length) {
      return imgs[0];
    }
    return 'assets/images/product/s328/product-17.jpg';
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

  addToWithList(p: any): void {
    Init.offcanvasOpenWishlist();
  }
}
