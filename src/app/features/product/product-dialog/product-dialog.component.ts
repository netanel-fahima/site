import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Init} from "../../../../assets/js/init";
import {DataService} from "../../../core/data.service";

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit, AfterViewChecked {

  @Input() product: {};


  constructor(public data: DataService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    Init.productZoom();
    console.log("ProductDialogComponent")
    Init.qtyBtn();
  }


}
