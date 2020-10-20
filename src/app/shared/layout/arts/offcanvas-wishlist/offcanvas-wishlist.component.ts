import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {DataService} from "../../../../core/data.service";
import {Init} from "../../../../../assets/js/init";

@Component({
  selector: 'app-offcanvas-wishlist',
  templateUrl: './offcanvas-wishlist.component.html',
  styleUrls: ['./offcanvas-wishlist.component.css']
})
export class OffcanvasWishlistComponent implements OnInit, AfterViewChecked {

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
  }

  wishList() {
    return this.data.wishList;
  }

  ngAfterViewChecked(): void {
    //Init.qtyBtn();
  }
}
