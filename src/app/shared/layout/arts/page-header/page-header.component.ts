import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {EntityService} from '../../../../core/store/entity.service';
import {getLocalUser} from '../../../../core/localStore/loadStorage';


@Component({
  selector: 'app-smart-page-header',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageHeaderComponent {

  constructor(public data: EntityService) {
  }

  getUserName(): Observable<string> {
    return getLocalUser() && getLocalUser().username;

  }

}

