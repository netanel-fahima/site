import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from "../../../assets/js/init";
import {DataService} from "../../core/data.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit  , AfterViewChecked{

  constructor(public data : DataService) { }

  ngOnInit(): void {
  }

  carts() {
    return this.data.cart;
  }

  ngAfterViewChecked(): void {
    Init.first();
    Init.qtyBtn();
  }

  total() {
    return this.data.totalCart();
  }
}
