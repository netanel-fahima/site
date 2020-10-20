import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../core/data.service";

@Component({
  selector: 'app-offcanvas-cart',
  templateUrl: './offcanvas-cart.component.html',
  styleUrls: ['./offcanvas-cart.component.css']
})
export class OffcanvasCartComponent implements OnInit {

  constructor(public data : DataService ) { }

  ngOnInit(): void {
  }

  carts(){
    return this.data.cart;
  }

}
