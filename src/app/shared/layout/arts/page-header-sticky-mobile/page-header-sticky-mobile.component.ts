import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {EntityService} from '../../../../core/store/entity.service';


@Component({
  selector: 'app-page-header-sticky-mobile',
  templateUrl: './page-header-sticky-mobile.component.html',
  styleUrls: ['./page-header-sticky-mobile.component.css']
})
export class PageHeaderStickyMobileComponent implements OnInit, AfterContentChecked {
  ngAfterContentChecked(): void {
  }

  constructor(public data: EntityService) {
  }

  ngOnInit(): void {
  }

}
