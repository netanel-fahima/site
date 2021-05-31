import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bank-transform',
  templateUrl: './bank-transform.component.html',
  styleUrls: ['./bank-transform.component.css']
})
export class BankTransformComponent implements OnInit {

  @Output() endOrder: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.endOrder.emit(null);
  }

}
