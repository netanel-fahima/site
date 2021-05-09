import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../../../assets/js/init';
import {EntityService} from '../../../../core/store/entity.service';
import {HeaderService} from '../header.service';

@Component({
  selector: 'app-offcanvas-mobile-menu',
  templateUrl: './offcanvas-mobile-menu.component.html',
  styleUrls: ['./offcanvas-mobile-menu.component.css']
})
export class OffcanvasMobileMenuComponent implements OnInit, AfterViewChecked {

  ngAfterViewChecked(): void {
    Init.moblieMenu();
    Init.offcanvasToggle();
  }

  constructor(public data: EntityService, public service: HeaderService) {

  }

  ngOnInit(): void {

  }

}
