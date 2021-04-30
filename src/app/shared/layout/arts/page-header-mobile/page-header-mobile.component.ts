import {AfterContentChecked, AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../../../assets/js/init';
import {EntityService} from '../../../../core/store/entity.service';

@Component({
  selector: 'app-page-header-mobile',
  templateUrl: './page-header-mobile.component.html',
  styleUrls: ['./page-header-mobile.component.css']
})
export class PageHeaderMobileComponent implements OnInit, AfterViewChecked {

  ngAfterViewChecked(): void {
    Init.offcanvasToggle();
  }

  constructor(public data: EntityService) {
  }

  ngOnInit(): void {
  }

}
