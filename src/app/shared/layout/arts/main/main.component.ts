import {AfterContentInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {OffcanvasCartComponent} from '../offcanvas-cart/offcanvas-cart.component';

import {NgxSpinnerService} from 'ngx-spinner';
import {select, Store} from '@ngrx/store';
import * as fromProduct from '../../../../core/store';
import {EntityType} from '../../../../core/store/actions';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-smart-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, AfterContentInit {

  @ViewChild('app_offcanvas_cart', {static: true}) cartComponent: OffcanvasCartComponent;

  public loadingProducts$: Observable<any[]>;

  constructor(private spinner: NgxSpinnerService, private store: Store) {

    this.loadingProducts$ = this.store.pipe(select(fromProduct.getLoaded, {cmd: EntityType.Products}));

    this.loadingProducts$.subscribe(value => {
      if (value) {
        this.spinner.show();
      }
      else {
        this.spinner.hide();
      }
    });
  }

  ngOnInit(): void {


  }


  ngAfterContentInit(): void {
  }

}
