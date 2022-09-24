import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/customToastr/custom-toastr.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ECommerceClient';
  // HTML sayfasında erişmek için public yapıyoruz
  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router
  ) {
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();

    this.router.navigate(['']); // çıkış yapılınca anasayfaya yönlendiriyoruz

    this.toastrService.message('Succes', 'Success', {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopLeft,
    });
  }
}
