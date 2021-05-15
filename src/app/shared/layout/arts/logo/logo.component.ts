import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
  selector: 'app-smart-logo',
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {


  constructor() {
  }


}
