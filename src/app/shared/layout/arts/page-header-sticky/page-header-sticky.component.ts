import { Component, OnInit } from '@angular/core';
import {Init} from 'src/assets/js/init'

@Component({
  selector: 'app-page-header-sticky',
  templateUrl: './page-header-sticky.component.html',
  styleUrls: ['./page-header-sticky.component.css']
})
export class PageHeaderStickyComponent implements OnInit  {

  constructor() { }


  ngOnInit(): void {
    Init.slider()
  }

}
