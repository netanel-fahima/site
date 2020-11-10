import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DataService} from "../../../../core/data.service";
import {Observable, of} from "rxjs";


@Component({
  selector: 'smart-page-header',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageHeaderComponent {

  constructor(public data: DataService) {}

  getUserName(): Observable<string> {
    let user = this.data.getUser();
    return of(user.profile === 'GUEST' ? 'אורח' : user.firstName)
  }

}
