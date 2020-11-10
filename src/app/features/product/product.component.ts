import {AfterViewChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Init} from "../../../assets/js/init";
import {DataService} from "../../core/data.service";
import {ProductDialogComponent} from "./product-dialog/product-dialog.component";
import {publishReplay, refCount} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewChecked , OnDestroy {

  @ViewChild('dialog', {static: true}) dialog: ProductDialogComponent;

  constructor(public data: DataService, private route: ActivatedRoute,  private router: Router) {
  }

  ngOnInit(): void {
    let params = this.route.snapshot.queryParams;
    if (!!params.category)
      this.data.productAsync = this.data.categoryRest.post({data: {}, cmd: `/${params.category}/products`});
    else {
      this.data.productAsync = this.data.productRest
        .list();
    }
  }

  ngAfterViewChecked(): void {

    this.data.productAsync.subscribe((value) => {
      Init.first();
      Init.filterToggle();
      Init.isotopeFilter();
      Init.isotopeGrid();
      Init.columnToggle();
      Init.addWishList();
      Init.quickViewModal();
    })
  }

  getImage(id: any) {
    return "assets/images/product/s328/product-17.jpg"
  }

  addToCart(p: any) {
    this.data.addToCart(p);
    Init.offcanvasOpen();
  }

  openDialog(product: any) {
    this.dialog.product = product;
  }

  ngOnDestroy(): void {
    this.data.productAsync = of([])
  }

  addToWithList(p: any) {
    this.data.addToWithList(p)
    Init.offcanvasOpenWishlist();
  }
}
