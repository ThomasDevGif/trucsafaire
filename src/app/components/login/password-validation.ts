import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('passwordRegister').value; // to get value in input tag
       let confirmPassword = AC.get('confirmPasswordRegister').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('confirmPasswordRegister').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}
