import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'ec-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    constructor(private auth: AuthService) {}

    public isConnected: boolean = false;
    public isAdmin: boolean = this.auth.isAdmin();
    public id: string = '';

    ngOnInit(): void {
        (this.auth as AuthService).isConnected$.subscribe({
            next: (isConnected: boolean) => {
                this.isConnected = isConnected;
            },
        });
        this.id = this.auth.user.id;
    }

    disconnect() {
        this.auth.disconnect();
    }
}
