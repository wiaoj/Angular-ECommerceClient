import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BaseComponent } from './base.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminModule, 
    UiModule]
})
export class ComponentsModule {}
