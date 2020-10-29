import {AfterViewChecked, AfterViewInit, Component, Input, NgZone, OnInit} from '@angular/core';
import {DataService} from "../../core/data.service";
import {RestService} from "../../core/rest/rest.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit , AfterViewChecked{

  public orderRest: RestService = new RestService("order", this.http);
  @Input() orders:any;

  constructor(public data :DataService, private http: HttpClient) { }

  load(){
    this.orders = this.orderRest.listBy({});
  }

  ngOnInit(): void {
    this.load()
  }

  ngAfterViewChecked(): void {
  }

}
