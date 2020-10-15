import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Init} from "../../../../../assets/js/init";

@Component({
  selector: 'app-page-header-sticky-mobile',
  templateUrl: './page-header-sticky-mobile.component.html',
  styleUrls: ['./page-header-sticky-mobile.component.css']
})
export class PageHeaderStickyMobileComponent implements OnInit , AfterContentChecked {
  ngAfterContentChecked(): void {
    Init.moblieMenu()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
