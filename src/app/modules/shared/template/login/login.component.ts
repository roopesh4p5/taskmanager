import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  loginForm : any = FormGroup
  user: User = {
    email: '',
    password: ''
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private spinnerService: NgxSpinnerService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  checkLoggedInUser( ) {
    this.spinnerService.show()
    console.log("login")
    const currentUser: User = this.loginForm.value;
    if ((currentUser.email === "company@gmail.com") && (currentUser.password === "company")) {
      this.router.navigateByUrl('company/dashboard')
      this.toastrService.success('Login Successfully')
    }
    if ((currentUser.email === "employee@gmail.com") && (currentUser.password === "employee")) {
      this.router.navigateByUrl('employee/dashboard')
      this.toastrService.success('Login Successfully')
    }
    if ((currentUser.email === "manager@gmail.com") && (currentUser.password === "manager")) {
      this.router.navigateByUrl('manager/dashboard')
      this.toastrService.success('Login Successfully')
    }
    setTimeout(() => {
      this.spinnerService.hide()
    }, 1000)
  }
}







