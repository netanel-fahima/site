import {AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {EntityService} from '../../../../core/store/entity.service';
import {Init} from '../../../../../assets/js/init';
import {delay, timeout} from 'rxjs/operators';

@Component({
  selector: 'app-section-fluid',
  templateUrl: './section-fluid.component.html',
  styleUrls: ['./section-fluid.component.css']
})

export class SectionFluidComponent implements OnInit, AfterViewChecked, DoCheck {
  ngDoCheck(): void {

  }

  constructor(private router: Router, public data: EntityService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this.data.categories$.pipe(
      delay(4000)
    ).subscribe(data => {
      Init.banner();
    });
  }

}
