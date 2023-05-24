import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  MessageType: '12';
  Token:any='';
  constructor(
    private fb: FormBuilder,
    private auth:AuthService,
    private router: Router
  ) {
this.auth.messages.subscribe((data)=>{
  // console.log(data)
  this.Token = data;
})
    };


  showPass() {
    console.log('Dziala');
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    // if (
    //   (this.loginForm.value.Username == 'Tom' &&
    //     this.loginForm.value.Password == 'password') ||
    //   (this.loginForm.value.Username == 'Roger' &&
    //     this.loginForm.value.Password == 'asd2') ||
    //   (this.loginForm.value.Username == 'Jesse' &&
    //     this.loginForm.value.Password == 'cook') ||
    //   (this.loginForm.value.Username == 'John' &&
    //     this.loginForm.value.Password == '1234')
    // ) {
    //   this.router.navigate(['test']);
    // }

    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);

      // let message2 = {
      //   MessageType: '12',
      //   Username:   'John' ,                             // this.loginForm.value.Username,
      //   Password:  '1234'                             // this.loginForm.value.Password,
      //   // DeviceId: '',
      // };
      // message2.MessageType = this.MessageType;
         this.auth.messages.next(this.loginForm.value)
           this.loginForm.reset();
    } else {
      console.log('Form is not valid');
    }
    // console.log(this.Token + 'To jest token')
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      MessageType:['',Validators.required]
    });
  }
}

// if (
//   this.loginForm.value.Username == 'Tom' &&
//   this.loginForm.value.Password == 'password'
// ) {
//   this.router.navigate(['test']);
// }
