import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { PasswordValidation } from './password-validation';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { DialogLoaderComponent } from '../dialog-loader/dialog-loader.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    public dialog: MatDialog,
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

  /**
   *  Log user
   */
  signIn() {
    let user: User = {
      id: null,
      name: this.identifiantCtrl.value,
      password: this.passwordCtrl.value
    }

    let self = this;
    // Start loading
    let dialogRef = self.dialog.open(DialogLoaderComponent);
    self.userService.getUserByLogin(user)
    .then(function(resUser) {
      // Stop loading
      dialogRef.close();
      if (resUser.length > 0) {
        self.authentificationService.login(resUser[0]);
      } else {
        self.openSnackbar('Identifiant ou mot de passe incorrect');
      }
    })
  }

  /**
   * Regioster user in database
   */
  signUp() {
    let user: User = {
      id: null,
      name: this.identifiantRegisterCtrl.value,
      password: this.passwordRegisterCtrl.value
    }

    let self = this;
    // Start loading
    let dialogRef = self.dialog.open(DialogLoaderComponent);
    self.userService.getUserByName(user)
    .then(function(resUser) {
      if (resUser.length > 0) {
        self.openSnackbar('Identifiant déjà utilisé');
        return;
      } else {
        return self.userService.createUser(user);
      }
    })
    .then(function() {
      // Reset form
      self.identifiantRegisterCtrl.setValue('');
      self.passwordRegisterCtrl.setValue('');
      self.confirmPasswordRegisterCtrl.setValue('');
      // Stop loading
      dialogRef.close();
      // Inform user
      self.openSnackbar('Le compte ' + user.name + ' a bien été créé');
    });
  }

  /**
   * Open snackbar to show some message
   * @param {string} message Info message
   */
  openSnackbar(message:string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
