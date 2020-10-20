import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Init} from "../../../../../assets/js/init";
import {DataService} from "../../../../core/data.service";

@Component({
  selector: 'app-page-header-mobile',
  templateUrl: './page-header-mobile.component.html',
  styleUrls: ['./page-header-mobile.component.css']
})
export class PageHeaderMobileComponent implements OnInit , AfterContentChecked{

  ngAfterContentChecked(): void {
    Init.offcanvasToggle();
  }

  constructor(public data : DataService) { }

  ngOnInit(): void {
  }

}
