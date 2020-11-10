import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './shared/layout/arts/main/main.component';
import {LayoutModule} from './shared/layout/arts/layout.module';
import {CheckoutDetailsComponent} from "./features/checkout/checkout-details/checkout-details.component";

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
      {path: '', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)},
      /* { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) },
      { path: 'info', loadChildren: () => import('./features/info/info.module').then(m => m.InfoModule) },
      { path: 'ui', loadChildren: () => import('./features/ui-pages/ui-pages.module').then(m => m.UiPagesModule) },
      { path: 'icons', loadChildren: () => import('./features/icons/icons.module').then(m => m.IconsModule) },*/

    ]
  },{
    path : 'checkout',
    component : CheckoutDetailsComponent
  }
];

@NgModule({
  imports: [LayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
