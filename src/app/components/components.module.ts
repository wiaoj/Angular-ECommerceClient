import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    AdminModule, 
    UiModule,
  ],
})
export class ComponentsModule {}
