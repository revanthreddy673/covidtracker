import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guest } from 'src/app/modelclass/guest.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-guestlogin',
  templateUrl: './guestlogin.component.html',
  styleUrls: ['./guestlogin.component.css'],
})
export class GuestloginComponent implements OnInit {
  guestLoginForm: FormGroup;
  errorMessage: string = null;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    let email: string = '';
    this.guestLoginForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
    });
  }

  onHandleError() {
    this.errorMessage = null;
  }

  onSubmit() {
    const guest: Guest = new Guest(1, this.guestLoginForm.value.email);
    this.loginService.guestLogin(guest).subscribe(
      (response) => {
        console.log(response);
        sessionStorage.setItem('guest', guest.email);
        this.router.navigate(['/cases/view']);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error;
      }
    );
  }
}
