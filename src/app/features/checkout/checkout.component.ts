import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl, AbstractControl
} from '@angular/forms';
import {Init} from '../../../assets/js/init';
import {EntityService} from '../../core/store/entity.service';
import Checkout, {MustMatch} from './checkout';
import {Store} from '@ngrx/store';
import * as productActions from '../../core/store/actions';
import {EntityType} from '../../core/store/actions';
import {getLocalCart} from '../../core/store/reducer';
import {getLocalUser} from '../../core/localStore/loadStorage';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewChecked {
  public submitted: boolean;
  @Input() createUser: any;
  form: FormGroup;
  public model = new Checkout('', '', '', '', '', '', '', '', '', false);

  ngAfterViewChecked(): void {
    Init.select2();
  }

  constructor(public data: EntityService, public store: Store, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
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
    });

  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef

  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  createOrder(): void {

  }


  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {

      const lineItems = getLocalCart().map(item => {
        return {
          product_id: item.product.id,
          quantity: item.quantity
        };
      });

      this.store.dispatch(new productActions.Add(EntityType.Orders, {
        customer_id: getLocalUser()?.id || 0,
        customer_note: this.f.note.value,
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
        line_items: lineItems
      }));
    }
  }
}
