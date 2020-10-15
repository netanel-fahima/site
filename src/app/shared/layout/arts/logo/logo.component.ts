import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'smart-logo',
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {


  constructor() { }


}
