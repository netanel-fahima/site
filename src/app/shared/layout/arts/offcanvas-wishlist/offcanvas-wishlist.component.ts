import {Component, OnInit} from '@angular/core';
import {EntityService} from '../../../../core/store/entity.service';
import * as productActions from '../../../../core/store/actions';
import {EntityType} from '../../../../core/store/actions';
import {Store} from '@ngrx/store';
import {ImageServiceService} from '../../../../core/utils/image-service.service';


@Component({
  selector: 'app-offcanvas-wishlist',
  templateUrl: './offcanvas-wishlist.component.html',
  styleUrls: ['./offcanvas-wishlist.component.css']
})
export class OffcanvasWishlistComponent implements OnInit {

  constructor(public data: EntityService, private store: Store, public imageService: ImageServiceService) {
  }

  ngOnInit(): void {
  }


  remove(id: number) {
    this.store.dispatch(new productActions.RemoveVisualWishList(EntityType.WishList, id));
  }
}
