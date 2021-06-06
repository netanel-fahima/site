import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {EntityService} from '../../../../core/store/entity.service';
import {getLocalUser} from '../../../../core/localStore/loadStorage';
import {concatMap, filter, map, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HeaderService} from '../header.service';


@Component({
  selector: 'app-smart-page-header',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageHeaderComponent {

  constructor(public data: EntityService, public router: Router, public service: HeaderService) {
  }
}

