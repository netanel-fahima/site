import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {Init} from "../../../../../assets/js/init";

@Component({
  selector: 'app-section-fluid',
  templateUrl: './section-fluid.component.html',
  styleUrls: ['./section-fluid.component.css']
})
export class SectionFluidComponent implements OnInit, AfterContentChecked {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    console.log("load banner");
    Init.banner();
  }

}
