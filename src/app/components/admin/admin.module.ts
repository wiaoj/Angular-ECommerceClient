import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { MatIconModule } from '@angular/material/icon';


//bir modül bir başka modülü benimseyecekse onu import etmelidir
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
    MatIconModule,
  ],
  exports: [
    LayoutModule,
  ]
})
export class AdminModule { }
