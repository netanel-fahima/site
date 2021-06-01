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
  public loadingOrder$: Observable<any[]>;

  constructor(private spinner: NgxSpinnerService, private store: Store) {

    this.loadingProducts$ = this.store.pipe(select(fromProduct.getLoaded, {cmd: EntityType.Products}));
    this.loadingOrder$ = this.store.pipe(select(fromProduct.getLoaded, {cmd: EntityType.Orders}));

    this.loadingProducts$
      .subscribe(value => {
        this.spinnerToggle(value);
      });
    this.loadingOrder$
      .subscribe(value => {
        this.spinnerToggle(value);
      });
  }

  private spinnerToggle(value: any[]): void {
    if (value) {
      this.spinner.show();
    }
    else {
      this.spinner.hide();
    }
  }

  ngOnInit(): void {


  }


  ngAfterContentInit(): void {
  }

}
