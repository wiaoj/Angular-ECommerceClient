import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
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
  ]
})
export class UiModule { }
