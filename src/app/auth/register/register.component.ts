import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmEqualValidator } from 'src/app/shared/validators/confirm-equal.validator';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';

@Component({
    selector: 'ec-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {}

    // Getter qui permet l'appel à la variable dans le template HTML
    get email() {
        return this.registerForm.controls['email'];
    }

    // getter qui permet l'appel à la variable dans le template HTML
    get password() {
        return this.registerForm.controls['password'];
    }

    // Booléen pour savoir quand afficher un loading spinner
    loading: boolean = false;

    // String qui contiendra une potentielle erreur envoyée du backend et sera affichée dans le template HTML
    registerError: string = '';

    /*
     * Initialisation du formulaire représenté en frontend.
     * Chaque variable correspond à un champ formControlName.
     * Les validators servent à empêcher l'envoi de données incorrectes en bloquant le bouton de validation.
     */
    registerForm = this.fb.group(
        {
            name: ['', Validators.required],
            surname: ['', Validators.required],
            nickname: ['', Validators.required],
            email: [
                '',
                {
                    validators: [Validators.required, Validators.email],
                    updateOn: 'blur',
                },
            ],
            password: [
                '',
                { validators: [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()], updateOn: 'blur' },
            ],
            confirmPassword: ['', Validators.required],
            agreement: [false, Validators.requiredTrue],
        },
        {
            validators: [confirmEqualValidator('password', 'confirmPassword')],
        }
    );

    /*
     * Fonction appelée lors de la validation de l'inscription
     * Elle créée un dto (data transfert object): newUser, qui reprend les champs à envoyer au backend
     * Elle s'abonne à la fonction register du service auth et réagit si la réponse est valide (next) ou incorrecte (error)
     */
    register() {
        this.loading = true;

        let newUser = {
            name: this.registerForm.value.name!,
            nickname: this.registerForm.value.nickname!,
            surname: this.registerForm.value.surname!,
            email: this.registerForm.value.email!,
            password: this.registerForm.value.password!,
        };
        this.auth.register(newUser).subscribe({
            next: (res: any) => {
                if (Array.isArray(res)) {
                    this.registerError = res[0].message;
                } else {
                    this.router.navigateByUrl('/auth/login');
                }
                this.loading = false;
            },
            error: (err: any) => {
                this.loading = false;
                this.registerError = 'Unexpected error happened, please contact easycook@support.com so we can further investigate.';
            },
        });
    }
}
