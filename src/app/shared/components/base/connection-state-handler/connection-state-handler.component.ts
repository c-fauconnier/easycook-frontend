import { Component, OnInit, Injector } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'ec-connection-state-handler',
    templateUrl: './connection-state-handler.component.html',
    styleUrls: ['./connection-state-handler.component.scss'],
})
export class ConnectionStateHandlerComponent implements OnInit {
    isConnected: boolean = false;
    user: User = {} as User;
    authService: AuthService = {} as AuthService;

    constructor(private inject: Injector) {
        //L'injector permet d'injecter les dépendances plus facilement. Il ne sera alors nécessaire que de faire un 'super(inject)' dans les enfants (pas oublié de l'instancer dans le constructor des enfants
        this.authService = inject.get(AuthService);
    }

    ngOnInit(): void {
        //Le forkJoin est une fonction de RXJS qui permet d'attendre d'avoir la réponse de toutes les requêtes pour faire le traitement de l'abonnement
        forkJoin({
            isConnected: this.authService.isConnected$,
            user: this.authService.user$,
        }).subscribe({
            next: (res: { isConnected: boolean; user: User }) => {
                this.user = res.user;
                this.isConnected = res.isConnected;
            },
        });
    }
}
