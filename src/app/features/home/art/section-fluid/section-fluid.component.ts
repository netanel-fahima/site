import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Init } from '../../../../../assets/js/init';
import { RestService } from '../../../../core/rest/rest.service';
import { HttpClient } from '@angular/common/http';
import { noop, Observable } from 'rxjs';
import { DataService } from '../../../../core/data.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/rest/mapFromServer';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-section-fluid',
  templateUrl: './section-fluid.component.html',
  styleUrls: ['./section-fluid.component.css']
})

export class SectionFluidComponent implements OnInit, AfterViewChecked {

  public categories: Category[];

  constructor(public data: DataService, private router: Router) {
    data.categories.asObservable().subscribe(data => {
      this.categories = data;
      setTimeout(()=>{
        Init.banner()
      },2000)
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {

  }

}
