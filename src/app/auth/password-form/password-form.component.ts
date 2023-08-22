import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { confirmEqualValidator } from 'src/app/shared/validators/confirm-equal.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';
import { AuthService } from '../auth.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'ec-password-form',
    templateUrl: './password-form.component.html',
    styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent implements OnInit {
    resetForm: FormGroup;
    isSubmitting = false;
    token: string;
    response: string;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: AuthService) {
        this.resetForm = this.fb.group(
            {
                password: [
                    '',
                    { validators: [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()], updateOn: 'blur' },
                ],
                confirmPassword: ['', Validators.required],
            },
            { validators: [confirmEqualValidator('password', 'confirmPassword')] }
        );

        const token = this.route.snapshot.paramMap.get('token'); // Capturez le token depuis l'URL si nécessaire
    }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParams.token;
    }
    // getter qui permet l'appel à la variable dans le template HTML
    get password() {
        return this.resetForm.controls['password'];
    }

    onSubmit() {
        this.isSubmitting = true;

        if (this.resetForm.valid) {
            const newPassword = this.resetForm.value.password;

            // Envoyer la demande de réinitialisation avec le nouveau mot de passe
            this.service.resetPassword(this.token, { password: newPassword }).subscribe({
                next: (res: User) => {
                    this.isSubmitting = false;
                    // Réinitialiser le formulaire ou rediriger vers une page de succès
                    this.response = 'Votre mot de passe a été modifié';
                    //this.resetForm.reset();
                },
                error: (err: HttpErrorResponse) => {
                    this.isSubmitting = false;
                },
            });
        }
    }
}
