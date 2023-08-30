import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProfileService } from '../profile.service';
import { confirmEqualValidator } from 'src/app/shared/validators/confirm-equal.validator';
import { ToastrService } from 'ngx-toastr';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/password-strength.validator';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
    selector: 'ec-profile-modif',
    templateUrl: './profile-modif.component.html',
    styleUrls: ['./profile-modif.component.scss'],
})
export class ProfileModifComponent implements OnInit {
    userId: string = this.auth.user.id;
    user: User;

    constructor(
        private auth: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private service: ProfileService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.service.userData$.subscribe({
            next: (res) => {
                this.user = res;
                this.updateForm.patchValue({
                    name: this.user.name,
                    surname: this.user.surname,
                    nickname: this.user.nickname,
                    email: this.user.email,
                });
            },
        });
    }

    // Getter qui permet l'appel à la variable dans le template HTML
    get email() {
        return this.updateForm.controls['email'];
    }

    // getter qui permet l'appel à la variable dans le template HTML
    get password() {
        return this.passwordForm.controls['password'];
    }

    // Booléen pour savoir quand afficher un loading spinner
    loading: boolean = false;

    // String qui contiendra une potentielle erreur envoyée du backend et sera affichée dans le template HTML
    updateError: string = '';

    /*
     * Initialisation du formulaire représenté en frontend.
     * Chaque variable correspond à un champ formControlName.
     * Les validators servent à empêcher l'envoi de données incorrectes en bloquant le bouton de validation.
     */
    updateForm = this.fb.group({
        name: [''],
        surname: [''],
        nickname: [''],
        email: [
            '',
            {
                validators: [Validators.email],
                updateOn: 'blur',
            },
        ],
    });
    passwordForm = this.fb.group(
        {
            password: ['', { validators: [Validators.minLength(8), createPasswordStrengthValidator()], updateOn: 'blur' }],
            confirmPassword: [''],
        },
        {
            validators: [confirmEqualValidator('password', 'confirmPassword')],
        }
    );

    /*
     * Fonction appelée lors de la validation de l'inscription
     * Elle créée un dto (data transfert object): newUser, qui reprend les champs à envoyer au backend
     * Elle s'abonne à la fonction update du service auth et réagit si la réponse est valide (next) ou incorrecte (error)
     */
    update() {
        this.loading = true;

        let updatedUser = {
            name: this.updateForm.value.name,
            nickname: this.updateForm.value.nickname,
            surname: this.updateForm.value.surname,
            email: this.updateForm.value.email,
        };
        this.service.update(this.userId, updatedUser).subscribe({
            next: (res: any) => {
                console.log(res);
                if (Array.isArray(res)) {
                    this.updateError = res[0].message;
                } else {
                    this.toastr.success('Profil mis à jour');
                    this.router.navigateByUrl(`/profile/${this.userId}`);
                }
                this.loading = false;
            },
            error: (err: any) => {
                this.loading = false;
                this.updateError = 'Unexpected error happened, please contact easycook@support.com so we can further investigate.';
            },
        });
    }

    updatePassword() {
        this.loading = true;

        let newPassword = {
            password: this.passwordForm.value.password,
        };
        this.service.updatePassword(this.userId, newPassword).subscribe({
            next: (res: any) => {
                if (Array.isArray(res)) {
                    this.updateError = res[0].message;
                } else {
                    this.toastr.success('Profil mis à jour');
                    this.router.navigateByUrl(`/profile/${this.userId}`);
                }
                this.loading = false;
            },
            error: (err: any) => {
                this.loading = false;
                this.updateError = 'Unexpected error happened, please contact easycook@support.com so we can further investigate.';
            },
        });
    }
}
