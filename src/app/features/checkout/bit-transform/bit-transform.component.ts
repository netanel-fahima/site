import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bit-transform',
  templateUrl: './bit-transform.component.html',
  styleUrls: ['./bit-transform.component.css']
})
export class BitTransformComponent implements OnInit {

  @Output() endOrder: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.endOrder.emit(null);
  }

}
