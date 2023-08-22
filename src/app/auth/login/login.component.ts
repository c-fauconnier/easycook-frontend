import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
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
     * Booléens pour savoir quand afficher un chargeur et/ou un message d'erreur
     */
    loading: boolean = false;
    error: boolean = false;

    // Champs du formulaire de connexion
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    // Getter pour utiliser la valeur de l'e-mail dans le composant
    get email() {
        return this.loginForm.get('email');
    }

    /*
     * Méthode de connexion qui affiche un effet de chargement en attendant la réponse du backend.
     * Nous rassemblons les valeurs du formulaire de connexion et créons un objet credentials à envoyer au backend.
     * En fonction de la réponse (ok : access_token accordé, erreur : tableau d'erreurs potentielles),
     * la page se redirigera ou affichera le message d'erreur
     */
    login() {
        this.loading = true;
        if (this.loginForm.invalid) return;
        // APPEL À L'API avec le nom d'utilisateur et le mot de passe
        let credentials = {
            email: this.loginForm.get('email')!.value as string,
            password: this.loginForm.get('password')!.value as string,
        };
        this.auth.login(credentials).subscribe({
            next: (res: AccessToken) => {
                this.loading = false; // Fin du chargement
                if (res.access_token) {
                    location.href = '/'; // Redirige vers la page d'accueil si l'access_token est valide
                } else {
                    this.loading = false;
                    this.error = true; // Affiche le message d'erreur en cas de problème d'authentification
                    return;
                }
            },
            error: (res: any) => {
                this.loading = false; // Fin du chargement
                this.error = true; // Affiche le message d'erreur en cas d'erreur de requête
                return;
            },
        });
    }
}
