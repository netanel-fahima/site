import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../core/rest/rest.service';
import {DataService} from '../../core/data.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from "rxjs";
import Maper from 'src/app/core/rest/mapFromServer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private login: RestService = new RestService('login', this.http);
  private registe: RestService = new RestService('customers', this.http);

  @Input() email: any;
  @Input() name: any;
  @Input() registerName: any;
  private  maper : Maper = new Maper

  user: Observable<any>;

  constructor(private data: DataService, private http: HttpClient, private router: Router,
              private deviceService: DeviceDetectorService) {
    this.user = this.data.userDetail.asObservable();
  }

  ngOnInit(): void {

  }

  signIn(email: any) {
    console.log(`login with ${email}`);
    this.login.post({
      data: {
        machine: {name: this.deviceService.getDeviceInfo().device},
        name: this.email,
        password: 'Admin'
      }
    }).pipe(
      tap((value: any) => {
        if (!value || value === 'FAILED') {
          alert('הכניסה נכשלה - אמייל לא תואם');
        }
      }),
      filter(value => value)
    )
      .subscribe(value => {
        console.log('Login with' , value);
        localStorage.setItem('signed', JSON.stringify(value));
        this.data.userDetail.asObservable().subscribe(value1 => {
          this.data.user = value1;
          this.router.navigateByUrl('home').then();
          this.data.loadNecessary();
        });

        this.data.setUser();
      });

  }


  register(username: any, email: any) {
    this.registe.post({data:this.maper.customer({username,email})})
      .subscribe(value => {
        // set local
        console.log(value);
        if (value != 'FAILED') {
          localStorage.setItem('signed', JSON.stringify(value));
          if (value.email === email) {
            alert('רשום כבר - הכניסה מתבצעת');
          } else {
            alert('נרשמת בהצלחה');
          }
          this.router.navigateByUrl('home').then();
        }
      });
  }

  logedIn() {
    return (localStorage.getItem('signed') !== null);
  }


}
