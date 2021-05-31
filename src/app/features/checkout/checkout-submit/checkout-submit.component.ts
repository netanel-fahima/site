import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {EntityService} from '../../../core/store/entity.service';
import * as productActions from '../../../core/store/actions';
import {EntityType} from '../../../core/store/actions';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-checkout-submit',
  templateUrl: './checkout-submit.component.html',
  styleUrls: ['./checkout-submit.component.css']
})
export class CheckoutSubmitComponent {

  @Input() order: Observable<any>;
  public err;
  public errMsg;

  constructor(public route: ActivatedRoute, public data: EntityService, public store: Store) {
    this.order = this.route.queryParams.pipe(
      switchMap(params => {
        const filters = {
          orderId: params.orderId || '',
          err: params.errormessage,
          errMsg: params.errordescription
        };
        this.err = filters.err;
        this.errMsg = filters.errMsg;
        this.store.dispatch(new productActions.Load(EntityType.Orders));
        return this.data.orders$.pipe(
          switchMap(
            (orders) => {
              return of(orders.find(o => o.id === +filters.orderId));
            }
          ));
      })
    );

    this.order.subscribe(order => {
      if (order) {
        this.completeOrder(order, this.err ? 'failed' : 'processing');
      }
    });
  }


  // tslint:disable-next-line:variable-name
  completeOrder(order: any, status): void {
    this.store.dispatch(new productActions.Updating(EntityType.UpdateOrder, {
      id: order.id,
      status,
      set_paid: status === 'processing',
      meta_data: status === 'processing' ? [] : [{key: 'err', value: this.errMsg}],
      customer_note: status === 'processing' ? order.customer_note : order.customer_note + '\r\n סיבת כשלון בתשלום \r\n' + this.errMsg
    }));
  }
}
