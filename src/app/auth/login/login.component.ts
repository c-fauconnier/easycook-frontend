import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DecodedToken } from 'src/app/shared/interfaces/decoded-token.interface';
import { AccessToken } from 'src/app/shared/interfaces/access-token.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'ec-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(private auth: AuthService, private router: Router) {}

    /*
     * Booleans to know when to display a loader and/or an error message
     */
    loading: boolean = false;
    error: boolean = false;

    // Login form's fields
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    // Getter to use email value in the component
    get email() {
        return this.loginForm.get('email');
    }

    /*
     * Login method which displays a loading effect while waiting for backend response.
     * We gather loginForm values and create a credentials object to send to the backend.
     * Depending on the response (ok: access_token granted, error: Array of potentials errors),
     * the page will redirect or display the error message
     */
    login() {
        this.loading = true;
        if (this.loginForm.invalid) return;
        // CALL API with username and password
        let credentials = {
            email: this.loginForm.get('email')!.value as string,
            password: this.loginForm.get('password')!.value as string,
        };
        this.auth.login(credentials).subscribe({
            next: (res: AccessToken) => {
                this.loading = false;
                if (res.access_token) this.router.navigateByUrl('/');
                else {
                    this.loading = false;
                    this.error = true;
                    return;
                }
            },
            error: (res: any) => {
                this.loading = false;
                this.error = true;
                return;
            },
        });
    }
}
