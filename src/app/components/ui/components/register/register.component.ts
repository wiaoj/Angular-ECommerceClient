import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Create_User } from 'src/app/contracts/user/Create_User';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/customToastr/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService
  ) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        //2. dizi içinde validasyonlar tanımlanıyor
        nameSurname: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.maxLength(250), Validators.email],
        ],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let password = group.get('password').value;
          let passwordConfirm = group.get('passwordConfirm').value;

          return password === passwordConfirm ? null : { notSame: true };
        },
      }
    );
  }

  //property olduğu için component şeklinde kullanılabilir hale geliyo
  get component() {
    return this.form.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;

    if (this.form.invalid) return;

    const result: Create_User = await this.userService.create(user);

    if (result.succeeded) {
      this.toastrService.message(result.message, 'Success', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopFullWidth,
      });
    } else {
      this.toastrService.message(result.message, 'Error', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
    }
  }
}
