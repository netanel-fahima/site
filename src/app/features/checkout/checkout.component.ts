import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Init} from '../../../assets/js/init';
import {EntityService} from '../../core/store/entity.service';
import {select, Store} from '@ngrx/store';
import * as productActions from '../../core/store/actions';
import {EntityType} from '../../core/store/actions';
import {getLocalCart} from '../../core/store/reducer';
import {getLocalUser} from '../../core/localStore/loadStorage';
import * as actions from '../login/slice/actions';
import {getErr, getUser} from '../login/slice/actions';
import {Observable} from 'rxjs/internal/Observable';
import * as fromProduct from '../../core/store';
import {getError, getLoaded} from '../../core/store';
import {map, withLatestFrom} from 'rxjs/operators';
import {scrollToTop} from '../../shared/utils/layoytUtils';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewChecked {

  constructor(public data: EntityService, public store: Store, private formBuilder: FormBuilder) {
    this.store.dispatch(new actions.Load(getLocalUser()));
    this.autError$ = this.store.select(getErr);
    this.orderError$ = this.store.select(getError, {cmd: EntityType.Orders});
    this.orderLoad$ = this.store.select(getLoaded, {cmd: EntityType.Orders});
    this.store.dispatch(new productActions.Load(EntityType.ShippingMethods));
    this.shippingMethods$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.ShippingMethods}));
  }

  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  public submitted: boolean;
  @Input() createUser: any;
  form: FormGroup;
  private user: any;
  autError$: Observable<{ l: string; r: string }>;
  private orderCreated = false;
  public order: any;
  orderError$: Observable<any>;
  orderLoad$: Observable<boolean>;

  public payMethod: string;
  public shippingMethods$: Observable<any[]>;

  public coupons: any[] = [];

  public couponModel = '';

  ngAfterViewChecked(): void {
    Init.select2();
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.Load(getLocalUser()));
    this.form = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      bdAddress2: new FormControl('', Validators.required),
      bdAddress1: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postal: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      note: new FormControl(''),
      createUser: new FormControl(''),
      deliveryMethod: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
    this.store.select(getUser).subscribe(value => {
      this.user = value;
    });

    this.store.dispatch(new productActions.LoadSuccess(EntityType.Orders, []));
    this.data.orders$.subscribe(orders => {
      this.order = orders[orders.length - 1];
    });
  }

  createOrder(): void {

    const subOrder = this.data.delivery$.subscribe((delivery: any) => {

      const lineItems = getLocalCart().map(item => {
        return {
          product_id: item.product.id,
          quantity: item.quantity,
          meta_data: item.options
        };
      });
      this.store.dispatch(new productActions.Add(EntityType.Orders, {
        customer_id: this.user?.id || 0,
        customer_note: this.f.note.value,
        payment_method_title: this.payMethod,
        billing: {
          first_name: this.f.firstName.value,
          last_name: this.f.lastName.value,
          address_1: this.f.bdAddress1.value,
          address_2: this.f.bdAddress2.value,
          city: this.f.city.value,
          state: 'ISRAEL',
          postcode: this.f.postal.value,
          country: '',
          email: this.f.email.value,
          phone: this.f.phone.value
        },
        shipping: {
          first_name: this.f.firstName.value,
          last_name: this.f.lastName.value,
          address_1: this.f.bdAddress1.value,
          address_2: this.f.bdAddress2.value,
          city: this.f.city.value,
          state: 'ISRAEL',
          postcode: this.f.postal.value,
          country: ''
        },
        line_items: lineItems,
        coupon_lines: this.coupons,
        shipping_lines: [{
          method_id: delivery.instance_id,
          method_title: delivery.title,
          total: delivery?.settings?.cost?.value
        }]
      }));

      try {
        subOrder.unsubscribe();
      }
      catch (e) {
      }
    });


    const sub = this.orderLoad$.pipe(
      withLatestFrom(this.orderError$),
      map(([loaded, err]) => {
        return !(loaded || err);
      })).subscribe(orderDone => {
      if (orderDone) {
        sub.unsubscribe();
      }
    });

  }


  onSubmit($event: any): void {

    this.payMethod = $event.submitter.value;

    this.submitted = true;


    this.orderError$.subscribe(value => {
      this.orderCreated = false;
    });

    if (this.form.valid && this.payMethod) {
      if (!this.user && this.f.createUser.value) {
        this.store.dispatch(new actions.Register({
          username: this.f.email.value,
          email: this.f.email.value,
          first_name: this.f.firstName.value,
          last_name: this.f.lastName.value,
        }));
        this.data.users$.subscribe(value => {
          if (value && this.f.createUser.value) {
            if (!this.orderCreated) {
              this.createOrder();
              this.orderCreated = true;
            }
          }
        });
      }
      else {
        this.createOrder();
      }
      return;
    }
    scrollToTop();
  }

  addDelivery($event): void {
    this.shippingMethods$.subscribe(shippingMethods => {
      const sm = shippingMethods.find(m => m.id === +$event);
      this.store.dispatch(new productActions.AddDeliveryVisual(EntityType.Delivery, sm));
    });
  }

  addCoupon(): void {
    const coupon = {
      code: this.couponModel
    };
    this.removeCoupon(coupon);
    this.coupons.push(coupon);
  }

  removeCoupon(c: any): void {
    this.coupons = this.coupons.filter(value => value.code !== c.code);
  }

  completeOrder(): void {
    this.store.dispatch(new productActions.Updating(EntityType.UpdateOrder, {
      id: this.order.id,
      status: 'processing',
    }));
  }

}
