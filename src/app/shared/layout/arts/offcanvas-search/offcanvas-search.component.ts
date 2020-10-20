import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {DataService} from "../../../../core/data.service";
import {Init} from "../../../../../assets/js/init";

@Component({
  selector: 'app-offcanvas-search',
  templateUrl: './offcanvas-search.component.html',
  styleUrls: ['./offcanvas-search.component.css']
})
export class OffcanvasSearchComponent implements OnInit , AfterViewChecked {

  ngAfterViewChecked(): void {
    Init.select2();
  }

  constructor(public data : DataService) { }

  ngOnInit(): void {
  }

}
