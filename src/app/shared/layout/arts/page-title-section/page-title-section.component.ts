import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {getRouterState} from '../../../../core/router.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-page-title-section',
  templateUrl: './page-title-section.component.html',
  styleUrls: ['./page-title-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitleSectionComponent implements OnInit {

  date = Date.now();

  vm$ = this.store.select(getRouterState);

  constructor(private store: Store<any>) {
    console.log(store);
  }

  @Input() siteMap: any;
  title: any = '';


  ngOnInit(): void {
  }

  getTitle(){
    return this.title;
  }

}
