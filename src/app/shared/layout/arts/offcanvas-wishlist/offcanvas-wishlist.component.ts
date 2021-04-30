import {Component, OnInit} from '@angular/core';
import {EntityService} from '../../../../core/store/entity.service';


@Component({
  selector: 'app-offcanvas-wishlist',
  templateUrl: './offcanvas-wishlist.component.html',
  styleUrls: ['./offcanvas-wishlist.component.css']
})
export class OffcanvasWishlistComponent implements OnInit {

  constructor(public data: EntityService) {
  }

  ngOnInit(): void {
  }


}
