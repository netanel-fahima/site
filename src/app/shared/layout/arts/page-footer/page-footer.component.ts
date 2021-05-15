import {Component, OnInit} from '@angular/core';
import {scrollToTop} from '../../../utils/layoytUtils';

@Component({
  selector: 'smart-page-footer',
  templateUrl: './page-footer.component.html',
  styles: []
})
export class PageFooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  scrollToTop(): void {
    scrollToTop();
  }
}
