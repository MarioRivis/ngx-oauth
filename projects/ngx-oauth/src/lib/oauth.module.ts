import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {OAuthDefaultConfig, OAuthConfig, OAuthConfigService, LOCATION, LocationFactory} from './models';
import {OAuthService} from './services/oauth.service';
import {OAuthInterceptor} from './services/oauth.interceptor';
import {OAuthLoginComponent} from './components/login/oauth-login.component';

const OAuthInterceptorService = {
  provide: HTTP_INTERCEPTORS,
  useClass: OAuthInterceptor,
  multi: true,
};

const LocationService = {
  provide: LOCATION,
  useFactory: LocationFactory
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [OAuthLoginComponent],
  exports: [OAuthLoginComponent],
  providers: [
    LocationService,
    OAuthService,
    OAuthInterceptorService,
  ]
})
export class OAuthModule {

  static forRoot(config: OAuthConfig): ModuleWithProviders<OAuthModule> {
    return {
      ngModule: OAuthModule,
      providers: [
        LocationService,
        OAuthService,
        OAuthInterceptorService,
        {
          provide: OAuthConfigService,
          useValue: {
            ...OAuthDefaultConfig,
            ...config
          }
        }
      ]
    };
  }
}
