import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EntityService} from '../../core/store/entity.service';
import * as actions from './slice/actions';
import {getErr, getUser} from './slice/actions';
import {Store} from '@ngrx/store';
import {getLocalUser, removeLocalUser} from '../../core/localStore/loadStorage';
import {Observable} from 'rxjs/internal/Observable';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() email: any;
  @Input() name: any;
  @Input() registerName: any;
  @Input() registerEmail: any;
  public error$: Observable<{ l: string; r: string }>;
  @Input() user: any;


  constructor(public data: EntityService, private router: Router, private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.Load(getLocalUser()));
    this.store.select(getUser).subscribe(value => {
      this.user = value;
    });
    this.error$ = this.store.select(getErr);
  }

  signIn(email: any, username: any): void {
    this.store.dispatch(new actions.Login({email, username}));
  }

  register(): void {
    if (!this.user) {
      this.store.dispatch(new actions.Register({
        email: this.registerEmail,
        first_name: this.registerName,
        last_name: this.registerName,
        username: this.registerName,
      }));
      return;
    }
    alert('כבר רשום!');
  }


  signOut(): void {
    removeLocalUser();
    this.store.dispatch(new actions.Load(null));
  }
}
