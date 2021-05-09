import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ImageServiceService} from '../../../../core/utils/image-service.service';
import {Init} from '../../../../../assets/js/init';

@Component({
  selector: 'app-art-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewChecked {


  constructor(public imgService: ImageServiceService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    Init.slider();
  }

}
