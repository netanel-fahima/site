import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Init} from 'src/assets/js/init'
import {DataService} from "../../../../core/data.service";

@Component({
  selector: 'app-page-header-sticky',
  templateUrl: './page-header-sticky.component.html',
  styleUrls: ['./page-header-sticky.component.css']
})
export class PageHeaderStickyComponent implements OnInit, AfterViewChecked  {

  constructor(public data : DataService) { }


  ngOnInit(): void {

  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
    console.log("load slider");
    Init.slider();

  }

  ngAfterContentChecked(): void {
  }

}
