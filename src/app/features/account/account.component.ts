import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {EntityService} from '../../core/store/entity.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewChecked {

  @Input() orders: any;

  constructor(public data: EntityService) {
  }

  load() {

  }

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewChecked(): void {
  }

  signOut() {

  }
}
