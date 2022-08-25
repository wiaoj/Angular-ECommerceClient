import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import {MatIconModule} from '@angular/material/icon';
import { Toast, ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut:4000,
      extendedTimeOut: 2000,
      disableTimeOut:false,
      positionClass:"toast-top-right",
      tapToDismiss:true,
      closeButton:true,
      preventDuplicates: false,
      countDuplicates:true,
      resetTimeoutOnDuplicate:true,
      includeTitleDuplicates:true,
      newestOnTop: false,
      progressBar:true,
      progressAnimation: "decreasing",
      maxOpened:5,
      autoDismiss:true,
      easing:"ease-in",
      easeTime:250,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
