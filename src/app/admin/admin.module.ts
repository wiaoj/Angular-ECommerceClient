import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';


//bir modül bir başka modülü benimseyecekse onu import etmelidir
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
  ],
  exports: [
    LayoutModule,
  ]
})
export class AdminModule { }
