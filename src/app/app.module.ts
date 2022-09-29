import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './components/ui/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // Google login yapacağımız için ilgili kütüphane sadece app.module içerisinde çalıştığı için mecburan buraya taşıdık
    // login componenti direkt olarak app module bağladık çünkü ilgili kütüphane app module'da olmak
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: ['localhost:7158'], // header ile gönderilecek tokena birilerinin erişmesini engellemek içi bunu kullanıyoruz
        // Interceptor olarak header'a tokenimizi ekliyor - bunları bu kütüphane sayesinde yapıyoruz
      },
    }),
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'baseUrl',
      useValue: 'https://localhost:7158/api', //origin
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '544170587397-irgcfffm987ckuguk3b7vrt450oe9b15.apps.googleusercontent.com'
            ), // https://console.cloud.google.com/
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3278540179047559'), // https://developers.facebook.com
          },
        ],
        onError: (error) => console.log(error),
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
