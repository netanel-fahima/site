import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {Init} from "../../../assets/js/init";
import {DataService} from "../../core/data.service";
import {Observable} from "rxjs";
import {RestService} from "../../core/rest/rest.service";
import {HttpClient} from "@angular/common/http";
import {ProductDialogComponent} from "./product-dialog/product-dialog.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewChecked {

  @ViewChild('dialog',{static:true}) dialog:ProductDialogComponent;

  private rest: RestService = new RestService("product", this.http);
  public products: Observable<any[]>;

  constructor(private data: DataService, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.products = this.rest.list();
  }


  ngAfterViewChecked(): void {
    this.products.subscribe(value => {
      Init.first();
      Init.filterToggle();
      Init.isotopeFilter();
      Init.isotopeGrid();
      Init.columnToggle();
      Init.isotopeGrid();
      Init.addWishList();
    })
  }

  getImage(id: any) {
    return "assets/images/product/s328/product-17.jpg"
  }


  addToCart(p: any) {
    this.data.addToCart(p);
    Init.offcanvasOpen();
  }

  openDialog(p: any) {
    this.dialog.product = p;
    Init.quickViewModal();
  }
}
