import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet (activate)="onActivate($event, outlet)" #outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shelys';

  ngOnInit(): void {
  }

  onActivate(e, outlet): void {
    outlet.scrollTop = 0;
  }

}
