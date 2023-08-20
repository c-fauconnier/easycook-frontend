import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'ec-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
    resetForm: FormGroup;
    isSubmitting = false;
    isSuccess = false;
    error = '';

    constructor(private fb: FormBuilder, private service: AuthService) {
        this.resetForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit() {
        if (this.resetForm.valid) {
            const email = this.resetForm.value.email;

            this.isSubmitting = true;
            this.service.sendPasswordResetEmail(email).subscribe({
                next: () => {
                    this.isSuccess = true;
                    this.isSubmitting = false;
                },
                error: (err: HttpErrorResponse) => {
                    console.error("Une erreur s'est produite :", err);
                    this.isSubmitting = false;
                    this.error = 'Email incorrect';
                },
            });
        }
    }
}
