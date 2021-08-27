import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/modelclass/admin.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent implements OnInit {
  adminLoginForm: FormGroup;
  errorMessage: string = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let email: string = '';
    let password: string = '';

    this.adminLoginForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl(password, Validators.required),
    });

    console.log(this.adminLoginForm);
  }

  onHandleError() {
    this.errorMessage = null;
  }

  onSubmit() {
    console.log(this.adminLoginForm);
    const admin: Admin = new Admin(
      1,
      this.adminLoginForm.value.email,
      this.adminLoginForm.value.password
    );

    this.loginService.loginAdmin(admin).subscribe(
      (response) => {
        console.log(response);
        this.adminLoginForm.reset();
        console.log(this.route);
        sessionStorage.setItem('admin', admin.email);
        this.router.navigate(['/update/options']);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error;
      }
    );
  }
}
