import {Component, ChangeDetectionStrategy, AfterContentChecked} from '@angular/core';
import {Init} from "../../../../../assets/js/init";


@Component({
  selector: 'smart-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements   AfterContentChecked{
  ngAfterContentChecked(): void {
    Init.first();
  }


  constructor() { }


}
