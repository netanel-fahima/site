import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from "../../../../../assets/js/init";
import {RestService} from "../../../../core/rest/rest.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataService} from "../../../../core/data.service";

@Component({
  selector: 'app-section-fluid',
  templateUrl: './section-fluid.component.html',
  styleUrls: ['./section-fluid.component.css']
})

export class SectionFluidComponent implements OnInit, AfterViewChecked {

  constructor(public data: DataService) {}

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    console.log("categories =========" + this.data.categories);
    this.data.categories.subscribe(data =>{
      Init.banner();
    });
  }

}
