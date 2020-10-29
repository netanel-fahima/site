import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from "../../../assets/js/init";
import {DataService} from "../../core/data.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked {

  constructor(public data: DataService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    Init.first();
    Init.qtyBtn();
  }

  alert(quantity: any) {
    alert(quantity)
  }

  updateCart() {
    this.data.updateCartItems()
  }

  removeCart(p) {
    this.data.cartItem = this.data.cartItem.filter(c => c.product.id !== p.product.id);
    console.log("remove cart ", p);
    this.data.removeCart(p)
  }

}
