import {Component, OnInit} from '@angular/core';
import {EntityService} from '../../../../core/store/entity.service';
import {Router} from '@angular/router';
import {HeaderService} from '../header.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  constructor(public data: EntityService, private router: Router, public service: HeaderService) {
  }

  ngOnInit(): void {
  }

}
