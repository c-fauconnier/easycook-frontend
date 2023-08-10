import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/auth/auth.service';
import { DecodedToken } from 'src/app/shared/interfaces/decoded-token.interface';

@Component({
    selector: 'ec-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    constructor(private authService: AuthService) {}
    private _user: DecodedToken = {} as DecodedToken;
    public isConnected: boolean = false;
    ngOnInit(): void {
        (this.authService as AuthService).isConnected$.subscribe({
            next: (isConnected: boolean) => {
                console.log(isConnected);
                this.isConnected = isConnected;
                console.log(this.isConnected);
                this._user = jwt_decode(this.authService.user);
            },
        });

        //console.log(this.isConnected, this._user);
    }

    disconnect() {
        this.authService.disconnect();
    }
}
