import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  connectionForm: FormGroup;

  constructor(
    private router: Router,
    fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  signIn() {
    console.log('signIn');
  }

  signUp() {
    console.log('signUp');
  }

}
