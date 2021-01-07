import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../../../assets/js/init';
import {DataService} from '../../../../core/data.service';

@Component({
  selector: 'app-page-header-sticky-mobile',
  templateUrl: './page-header-sticky-mobile.component.html',
  styleUrls: ['./page-header-sticky-mobile.component.css']
})
export class PageHeaderStickyMobileComponent implements OnInit, AfterContentChecked {
  ngAfterContentChecked(): void {
  }

  constructor(public data: DataService) {}

  ngOnInit(): void {
  }

}
