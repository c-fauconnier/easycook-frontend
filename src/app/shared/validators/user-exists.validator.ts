import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { map, pipe } from 'rxjs';

export function userExistsValidator(auth: AuthService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return auth.findUserByEmail(control.value).pipe(map((user) => (user ? { userExists: true } : { userExists: false })));
    };
}
