import {AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {EntityService} from '../../../../core/store/entity.service';
import {Init} from '../../../../../assets/js/init';
import {delay, filter, timeout} from 'rxjs/operators';
import {ImageServiceService} from '../../../../core/utils/image-service.service';

@Component({
  selector: 'app-section-fluid',
  templateUrl: './section-fluid.component.html',
  styleUrls: ['./section-fluid.component.css']
})

export class SectionFluidComponent implements OnInit, AfterViewChecked {

  constructor(private router: Router, public data: EntityService, public imageService: ImageServiceService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this.data.categories$.pipe(
      filter(value => !!value?.length),
      delay(500)
    ).subscribe(data => {
      Init.banner();
    });
  }
}
