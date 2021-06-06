import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from 'src/assets/js/init';
import {EntityService} from '../../../../core/store/entity.service';

@Component({
  selector: 'app-page-header-sticky',
  templateUrl: './page-header-sticky.component.html',
  styleUrls: ['./page-header-sticky.component.css']
})
export class PageHeaderStickyComponent implements OnInit {

  constructor(public data: EntityService) {
  }


  ngOnInit(): void {

  }


  ngAfterViewChecked(): void {
    Init.slider();

  }

  ngAfterContentChecked(): void {
  }

}
