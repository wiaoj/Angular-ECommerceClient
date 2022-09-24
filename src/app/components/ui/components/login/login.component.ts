import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/components/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.SquareJellyBox);
    await this.userService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck(); // içindeki kontrolleri yapıp global değişkenimizin durumunu değiştiriyoruz

      // Route üzerindeki returnUrl kısmını okuyoruz
      this.activatedRoute.queryParams.subscribe(queryParams => {
       const returnUrl : string= queryParams["returnUrl"]; // return Url i okuyoruz
        if (returnUrl) // Eğer url var ise 
          this.router.navigate([returnUrl]); // Url'e yönlendiriyoruz
          // Url yoksa hiçbir şey yapmıyoruz xd
        
      })

      this.hideSpinner(SpinnerType.SquareJellyBox);
    });
  }
}
