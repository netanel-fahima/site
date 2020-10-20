import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from "../../../../../assets/js/init";
import {RestService} from "../../../../core/rest/rest.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-section-fluid',
  templateUrl: './section-fluid.component.html',
  styleUrls: ['./section-fluid.component.css']
})
export class SectionFluidComponent implements OnInit, AfterViewChecked {

  public categories: Observable<any[]> ;

  private rest: RestService = new RestService("category", this.http);

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.categories = this.rest.list();
  }


  ngAfterViewChecked(): void {
    console.log("categories" + this.categories);
    this.categories.subscribe(data =>{
      Init.banner();
    });
  }

}
