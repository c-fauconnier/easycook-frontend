import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/user/users.service';

@Component({
    selector: 'ec-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
    constructor(
        private service: ProfileService,
        private userService: UsersService,
        private auth: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService
    ) {}
    user: User;
    id: string | null;
    myAccount: boolean = false;
    buttonClicked = false;

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });
        this.service.userData$.subscribe({
            next: (res) => {
                this.user = res;
                this.auth.user.id === this.id ? (this.myAccount = true) : (this.myAccount = false);
            },
        });
    }

    deleteAccount() {
        const userConfirm = confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
        if (userConfirm) {
            this.userService.delete(this.user.id as string).subscribe({
                next: (res) => {
                    this.toastr.success('Compte supprimé !');
                    localStorage.removeItem('easycook_token');
                    this.router.navigateByUrl('/');
                },
            });
        }
    }

    modifyAccount() {
        this.router.navigateByUrl(`/profile/${this.user.id}/modify`);
    }

    resendVerificationEmail() {
        this.buttonClicked = true;

        this.service.sendConfirmationEmail().subscribe({
            next: (res: any) => {
                this.toastr.success(`Mail renvoyé à ${this.user.email}`);
            },
        });
    }
}
