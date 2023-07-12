import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  matchPass: string = 'none';
  @Output() accessToken: EventEmitter<string> = new EventEmitter();

  usersList: User[] = [
    {
      email: "ahmededhi@gmail.com",
      password: "123456"
    },
    // {
    //   email: "hamza@gmail.com",
    //   password: "123456"
    // },
    // {
    //   email: "abdullah@gmail.com",
    //   password: "123456"
    // },
    // {
    //   email: "raza@gmail.com",
    //   password: "123456"
    // },
    // {
    //   email: "zain@gmail.com",
    //   password: "123456"
    // },
    // {
    //   email: "admin@gmail.com",
    //   password: "123456"
    // },
  ];

  constructor() {
    localStorage.setItem("users", JSON.stringify(this.usersList))
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(14),
    ]),
    cpassword: new FormControl(''),
  })

  login() {
    const localUsers = localStorage.getItem("users");
    if (localUsers != null) {
      this.usersList = JSON.parse(localUsers)
    }
    console.log(localUsers)
    const isUserExists = this.usersList.find(user => user.email == this.Email.value && user.password == this.Password.value)
    if (this.Password.value === this.cPassword.value) {
      if (isUserExists) {
        const token = '929828963863986376389369836396393639'
        alert('Login Successful')
        localStorage.setItem("accessToken", JSON.stringify(token))
        this.accessToken.emit(token);
      }
      else {
        alert('Incorrect Credentials')
      }
      this.matchPass = 'none'
    }
    else {
      this.matchPass = 'inline'
    }
    console.log(this.loginForm.value)
  }

  get Email(): FormControl {
    return this.loginForm.get("email") as FormControl
  }

  get Password(): FormControl {
    return this.loginForm.get("password") as FormControl
  }

  get cPassword(): FormControl {
    return this.loginForm.get("cpassword") as FormControl
  }

}
