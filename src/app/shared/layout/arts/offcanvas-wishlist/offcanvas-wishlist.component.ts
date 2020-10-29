import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../core/data.service";

@Component({
  selector: 'app-offcanvas-wishlist',
  templateUrl: './offcanvas-wishlist.component.html',
  styleUrls: ['./offcanvas-wishlist.component.css']
})
export class OffcanvasWishlistComponent implements OnInit {

  constructor(public data: DataService) {
  }

  ngOnInit(): void {
  }


}
