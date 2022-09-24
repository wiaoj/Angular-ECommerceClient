import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/components/base.component';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/customToastr/custom-toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.spinner.show(SpinnerType.SquareJellyBox);
    // True dönerse ilgili componente erişim sağlanabilir, false dönerse erişim sağlanmaz
    // Guard kullanırken route geliştirilen module gelinir
    // Her objenin canActivate : [] şeklinde bir dizisi mevcut
    // Kullandığımız AuthGuardı kullanmak için canActivate : [AuthGuard] şeklinde kullanırız

    const token: string = localStorage.getItem('accessToken'); // LocalStorage'den tokeni çağırıyoruz varsa gelir yoksa null döner
    // npm i @auth0/angular-jwt ile interceptor yazmadan bu kütüphane sayesinde kullanabiliyoruz

    //const decodeToken = this.jwtHelper.decodeToken(token); // Tokenin içindeki bilgileri görürüz
    //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token); // Token bitiş tarihini görürüz
    let expired: boolean; // = this.jwtHelper.isTokenExpired(token); // Tokenin süresinin bitip bitmediğini görebiliriz

    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      expired = true;
    }
    if (!token || expired) {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      }); //login modülde path "" olduğu için direkt böyle yönlendirdir path "wiaoj" olsaydı wiaoj/login şeklinde vermeliydik
      // Gitmek istenen componentin url'i state.url içinde tutuyor, geldiğimiz yeri root - gideceğimiz yeri state tutuyor
      // Böylece login olunca otomatik adrese yönlendiriyoruz

      this.toastrService.message(
        'Please login or register',
        'You are not authorize',
        {
          messageType: ToastrMessageType.Warning,
          position: ToastrPosition.TopLeft,
        }
      );
    }

    this.spinner.hide(SpinnerType.SquareJellyBox);

    return true;
  }
}
