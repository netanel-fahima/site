import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {DataService} from '../../../../core/data.service';
import {Init} from '../../../../../assets/js/init';

@Component({
  selector: 'app-offcanvas-mobile-menu',
  templateUrl: './offcanvas-mobile-menu.component.html',
  styleUrls: ['./offcanvas-mobile-menu.component.css']
})
export class OffcanvasMobileMenuComponent implements OnInit , AfterViewChecked {

  ngAfterViewChecked(): void {}

  constructor(public data: DataService ) { }

  ngOnInit(): void {
    Init.moblieMenu();
  }

}
