import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './shared/layout/arts/main/main.component';
import {LayoutModule} from './shared/layout/arts/layout.module';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)  },
      { path: 'product', loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule) },
      /*{ path: 'model', loadChildren: () => import('./model/model.module').then(m => m.ModelModule) },
      { path: 'model/info', loadChildren: () => import('./model/info-model.module').then(m => m.InfoModelModule) },
      { path: 'intel', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) },
      { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) },
      { path: 'info', loadChildren: () => import('./features/info/info.module').then(m => m.InfoModule) },
      { path: 'ui', loadChildren: () => import('./features/ui-pages/ui-pages.module').then(m => m.UiPagesModule) },
      { path: 'icons', loadChildren: () => import('./features/icons/icons.module').then(m => m.IconsModule) },*/

      ]
  },
];

@NgModule({
  imports: [LayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
