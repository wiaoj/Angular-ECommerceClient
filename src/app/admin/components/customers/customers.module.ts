import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      //modüller üzerinden verilen rotalar üst rotalara gidiyor
      //bu yüzden path customer yerine boş verilebilir
      //başka modüller olsaydı isim vermemiz gerekecekti
      { path: '', component: CustomersComponent },
    ]),
  ],
})
export class CustomersModule {}
