import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ec-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
    constructor(private service: ProfileService, private auth: AuthService, private route: ActivatedRoute) {}
    user: User;
    id: string | null;
    myAccount: boolean = false;

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params['id'];
            //this.isMyAccount();
        });
        //this.id = this.route.snapshot.paramMap.get('id')!; // Récupère l'ID depuis l'URL
        this.service.userData$.subscribe({
            next: (res) => {
                this.user = res;
                this.auth.user.id === this.id ? (this.myAccount = true) : (this.myAccount = false);
            },
        });
    }
}
