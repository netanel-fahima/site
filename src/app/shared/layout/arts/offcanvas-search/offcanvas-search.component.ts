import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {DataService} from '../../../../core/data.service';
import {Init} from '../../../../../assets/js/init';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offcanvas-search',
  templateUrl: './offcanvas-search.component.html',
  styleUrls: ['./offcanvas-search.component.css']
})
export class OffcanvasSearchComponent implements OnInit , AfterViewChecked {
  name: any;

  ngAfterViewChecked(): void {

  }

  constructor(public data: DataService, private router: Router) { }

  ngOnInit(): void {
    Init.select2();
  }

  getImage(id: any) {
    return 'assets/images/product/s328/product-17.jpg';
  }
}
