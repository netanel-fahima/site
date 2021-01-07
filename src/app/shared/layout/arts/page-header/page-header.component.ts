import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DataService} from '../../../../core/data.service';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'smart-page-header',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageHeaderComponent {

  user: Observable<any>;

  constructor(public data: DataService) {
    this.user = this.data.userDetail.asObservable();
  }


}
