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

    loading: boolean = false;
    error: boolean = false;

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    // Getter needed to use it in html
    get email() {
        return this.loginForm.get('email');
    }

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
                if (res.access_token) this.router.navigateByUrl('#');
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
