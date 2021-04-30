import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../../../assets/js/init';
import {EntityService} from '../../../../core/store/entity.service';

@Component({
  selector: 'app-offcanvas-mobile-menu',
  templateUrl: './offcanvas-mobile-menu.component.html',
  styleUrls: ['./offcanvas-mobile-menu.component.css']
})
export class OffcanvasMobileMenuComponent implements OnInit, AfterViewChecked {

  ngAfterViewChecked(): void {
  }

  constructor(public data: EntityService) {

  }

  ngOnInit(): void {
    Init.moblieMenu();
  }

}
