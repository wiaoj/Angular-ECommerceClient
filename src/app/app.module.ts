import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: 'baseUrl',
      useValue: 'https://localhost:7158/api', //origin
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
