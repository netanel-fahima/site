import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../core/rest/rest.service";
import {DataService} from "../../core/data.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private login: RestService = new RestService("login", this.http);
  private registe: RestService = new RestService("register", this.http);

  @Input() email: any;
  @Input() name: any;
  @Input() registerName: any;

  constructor(private data: DataService, private http: HttpClient, private router: Router,
              private deviceService: DeviceDetectorService) {
  }

//{name: "machina"} ,"momo" , "asaas"
  ngOnInit(): void {

  }

  signIn(email: any) {
    console.log(`login with ${email}`);
    this.login.post( {machine: {name: this.deviceService.getDeviceInfo().device}, name: this.email, password: "Admin"})
      .subscribe(value => {
        //set local
        console.log(value);
        if (value != "FAILED") {
          localStorage.setItem("signed", JSON.stringify(value));
          this.router.navigateByUrl("home").then();
        }else
          alert("הכניסה נכשלה - אמייל לא תואם")
      });

  }

  register(registerName: any, email: any) {
    this.registe.post({machine: {name: "machina"}, user:{name: registerName, email: email}})
      .subscribe(value => {
        //set local
        console.log(value);
        if (value != "FAILED") {
          localStorage.setItem("signed", JSON.stringify(value));
          if (value.email === email) {
            alert("רשום כבר - הכניסה מתבצעת");
          } else {
            alert("נרשמת בהצלחה");
          }
          this.router.navigateByUrl("home").then();
        }
      });
  }

  logedIn() {
    return (localStorage.getItem("signed") !== null);
  }



  getUserLogin(){
    return this.data.getUserName();
  }

}
