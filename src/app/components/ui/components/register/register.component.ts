import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameSurname: [''],
      userName: [''],
      email: [''],
      password: [''],
      password2: [''],
    });
  }

  onSubmit(data: any) {}
}