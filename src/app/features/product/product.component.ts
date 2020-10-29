import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {Init} from "../../../assets/js/init";
import {DataService} from "../../core/data.service";
import {HttpClient} from "@angular/common/http";
import {ProductDialogComponent} from "./product-dialog/product-dialog.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewChecked {

  @ViewChild('dialog',{static:true}) dialog:ProductDialogComponent;

  constructor(public data: DataService, private http: HttpClient) {
    this.data.loadNecessary();
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this.data.productAsync.subscribe((value) => {
      Init.first();
      Init.filterToggle();
      Init.isotopeFilter();
      Init.isotopeGrid();
      Init.columnToggle();
      Init.isotopeGrid();
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
}
