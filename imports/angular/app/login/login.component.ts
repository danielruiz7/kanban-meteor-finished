import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../user/user.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  @ViewChild('passwordInput', { static: true }) passwordInput: ElementRef;
  @ViewChild('repeatInput', { static: true }) repeatInput: ElementRef;
  @ViewChild('usernameInput', { static: true }) usernameInput: ElementRef;

  username: string;
  password: string;

  repeat: string;

  errorMsg: string;

  signingUp: boolean = false;

  constructor(private us: UserService,
    private zone: NgZone) { }

  ngOnInit() { 
    this.usernameInput.nativeElement.focus();
  }

  login() {
    if (this.signingUp) {
      if (this.password !== this.repeat) {
        this.errorMsg = 'Passwords are not equal';
        this.repeat = '';
        this.repeatInput.nativeElement.focus();
      }

      this.signUp();
    } else {
      this.us.login(this.username, this.password, (err) => {
        this.zone.run(() => {
          this.errorMsg = 'Login failed';
          this.password = '';
          this.passwordInput.nativeElement.focus();
        });
      });
    }
  }

  private signUp() {
    this.us.signUp(this.username, this.password, (err) => {
      this.zone.run(() => {
        this.errorMsg = err;
      });
    });
  }


}