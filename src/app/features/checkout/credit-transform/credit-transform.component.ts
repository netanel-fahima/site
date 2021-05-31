import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-credit-transform',
  templateUrl: './credit-transform.component.html',
  styleUrls: ['./credit-transform.component.css']
})
export class CreditTransformComponent implements OnInit {

  @Input() order;
  @Output() endOrder: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  location(): string {
    return `${window.location.href.split('#')[0]} #/checkout-submit?orderId=${this.order.id}`;
  }
}
