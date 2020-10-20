import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../core/data.service";

@Component({
  selector: 'app-offcanvas-mobile-menu',
  templateUrl: './offcanvas-mobile-menu.component.html',
  styleUrls: ['./offcanvas-mobile-menu.component.css']
})
export class OffcanvasMobileMenuComponent implements OnInit {

  constructor(public data : DataService ) { }

  ngOnInit(): void {
  }

}
