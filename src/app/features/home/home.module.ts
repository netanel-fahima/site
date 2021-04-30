import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ArtComponent} from './art/art.component';
import {SectionFluidComponent} from './art/section-fluid/section-fluid.component';


@NgModule({
  declarations: [SectionFluidComponent],
  exports: [
    SectionFluidComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {
        path: '', component: ArtComponent, pathMatch: 'full',
        data: {breadcrumbs: ['Application Intel', 'Introduction']}
      }
    ])
  ]
})
export class HomeModule {
}
