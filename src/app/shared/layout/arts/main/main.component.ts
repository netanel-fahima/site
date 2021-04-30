import {AfterContentInit, ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {OffcanvasCartComponent} from '../offcanvas-cart/offcanvas-cart.component';
import {EntityService} from '../../../../core/store/entity.service';
import {Store} from '@ngrx/store';


@Component({
  selector: 'smart-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, AfterContentInit {

  @ViewChild('app_offcanvas_cart', {static: true}) cartComponent: OffcanvasCartComponent;


  constructor(private store: Store<{ cart: [any] }>) {
    /*this.data.loadNecessary();*/
  }

  ngOnInit(): void {


  }


  ngAfterContentInit(): void {
  }

}
