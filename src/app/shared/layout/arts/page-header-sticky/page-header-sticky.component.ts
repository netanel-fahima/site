import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Init} from 'src/assets/js/init'

@Component({
  selector: 'app-page-header-sticky',
  templateUrl: './page-header-sticky.component.html',
  styleUrls: ['./page-header-sticky.component.css']
})
export class PageHeaderStickyComponent implements OnInit, AfterContentChecked  {

  constructor() { }


  ngOnInit(): void {

  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
  }

  ngAfterContentChecked(): void {
    console.log("load slider");
    Init.slider();
  }

}
