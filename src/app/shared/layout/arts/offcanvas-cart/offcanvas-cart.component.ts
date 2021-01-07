import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {DataService} from '../../../../core/data.service';

@Component({
  selector: 'app-offcanvas-cart',
  templateUrl: './offcanvas-cart.component.html',
  styleUrls: ['./offcanvas-cart.component.css']
})

export class OffcanvasCartComponent implements OnInit, AfterViewInit {

  public carts: any[] =  [];

  constructor(public data: DataService, private zone: NgZone) {
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
  }

  removeCart(p) {
    //this.data.cartItem = this.data.cartItem.filter(c => c.product.id !== p.product.id);
    console.log('remove cart ', p);
    this.data.removeCart(p);
  }

  get cart(): any {
    return this.data.cart;
  }


}
