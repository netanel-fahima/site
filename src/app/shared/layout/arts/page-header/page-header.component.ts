import { Component, ChangeDetectionStrategy } from '@angular/core';
import {DataService} from "../../../../core/data.service";


@Component({
  selector: 'smart-page-header',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {


  constructor(public data : DataService) { }


}
