import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Init} from '../../../assets/js/init';
import {DataService} from '../../core/data.service';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {shareReplay, startWith} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Product} from 'src/app/core/rest/mapFromServer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('dialog', {static: true}) dialog: ProductDialogComponent;

  constructor(public data: DataService, private route: ActivatedRoute, private router: Router) {
  }

  public productAsync: Observable<Product[]>;

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    if (params.category) {
      this.productAsync =
        this.data.restService.category()
          .post({data: {}, cmd: `/${params.category}/products`});
    } else {
      this.productAsync = this.data.restService
        .product()
        .list()
        .pipe(
          startWith([])
          , shareReplay());
    }
  }

  ngAfterViewChecked(): void {

    this.productAsync.subscribe((value) => {
      Init.first();
      Init.filterToggle();
      Init.isotopeFilter();
      Init.isotopeGrid();
      Init.columnToggle();
      Init.addWishList();
      Init.quickViewModal();
    });
  }

  getImage(id: any) {
    return 'assets/images/product/s328/product-17.jpg';
  }

  addToCart(p: any) {
    this.data.addToCart(p);
    Init.offcanvasOpen();
  }

  openDialog(product: any) {
    this.dialog.product = product;
  }

  ngOnDestroy(): void {
    this.productAsync = of([]);
  }

  addToWithList(p: any) {
    this.data.addToWithList(p);
    Init.offcanvasOpenWishlist();
  }
}
