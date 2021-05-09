import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import $ from 'jquery';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  @Input() defaultColor: string;
  @Input('myHighlight') highlightColor: string;

  constructor(private el: ElementRef) {
  }

  @HostListener('mousedown') onMouseEnter(): void {
    this.highlight(this.highlightColor || this.defaultColor);
  }

  private highlight(color: string): void {
    $(this.el.nativeElement).find('a').css({border: 'unset'});
    $(this.el.nativeElement).find('a:active').css({border: '1px solid grey', padding: '1px'});
  }

}
