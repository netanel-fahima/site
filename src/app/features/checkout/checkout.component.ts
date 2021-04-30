import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from "../../../assets/js/init";
import {EntityService} from '../../core/store/entity.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit , AfterViewChecked {

  ngAfterViewChecked(): void {
    Init.select2()
  }

  constructor( public data: EntityService) { }

  ngOnInit(): void {
  }

}
