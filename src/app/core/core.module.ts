import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {environment} from 'src/environments/environment';
import {reducers} from '../store';
import {CustomSerializer} from '../store/router';
import {CloudinaryModule} from '@cloudinary/angular-5.x';
import {Cloudinary} from 'cloudinary-core';


/**
 * Module for global imports
 */


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    CloudinaryModule.forRoot({Cloudinary},
      {
        cloud_name: 'ddvlwmhbe', upload_preset: 'ii9wuyma'
      })
    ,
    // ngrx modules
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly: environment.production,
      actionsBlocklist: ['@ngrx/router*']
    }),

    StoreRouterConnectingModule.forRoot(),

  ],
  providers: [
    // use custom serializer to strip redundant router data
    {provide: RouterStateSerializer, useClass: CustomSerializer}

  ]
})
export class CoreModule {
  // thi module can be load only once
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`);
  }
}

