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

    public isConnected: boolean = false;

    ngOnInit(): void {
        (this.authService as AuthService).isConnected$.subscribe({
            next: (isConnected: boolean) => {
                this.isConnected = isConnected;
            },
        });
    }

    disconnect() {
        this.authService.disconnect();
    }
}
