import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PasswordValidation } from './password-validation';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading:boolean = false;

  connectionForm: FormGroup;
  identifiantCtrl: FormControl;
  passwordCtrl: FormControl;

  registerForm: FormGroup;
  identifiantRegisterCtrl: FormControl;
  passwordRegisterCtrl: FormControl;
  confirmPasswordRegisterCtrl: FormControl;

  constructor(
    private userService: UserService,
    private authentificationService: AuthentificationService,
    private router: Router,
    public snackBar: MatSnackBar,
    public fb: FormBuilder
  ) {

    this.identifiantCtrl = fb.control('', [ Validators.required ]);
    this.passwordCtrl = fb.control('', [ Validators.required ]);

    this.connectionForm = fb.group({
      name: this.identifiantCtrl,
      password: this.passwordCtrl,
    });

    this.identifiantRegisterCtrl = fb.control('', [ Validators.required ]);
    this.passwordRegisterCtrl = fb.control('', [ Validators.required ]);
    this.confirmPasswordRegisterCtrl = fb.control('', [ Validators.required ]);

    this.registerForm = fb.group({
      nameRegister: this.identifiantRegisterCtrl,
      passwordRegister: this.passwordRegisterCtrl,
      confirmPasswordRegister: this.confirmPasswordRegisterCtrl
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  ngOnInit() {
  }

  signIn() {
    let user: User = {
      id: null,
      name: this.identifiantCtrl.value,
      password: this.passwordCtrl.value
    }

    let self = this;
    self.loading = true;
    self.userService.getUserByLogin(user)
    .then(function(resUser) {
      self.loading = false;
      if (resUser.length > 0) {
        self.authentificationService.login(resUser[0]);
      } else {
        self.openSnackbar('Identifiant ou mot de passe incorrect');
      }
    })


    // TODO: get before user by login
    // this.authentificationService.login(user);
  }

  signUp() {
    console.log('signUp');
  }

  openSnackbar(message:string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
