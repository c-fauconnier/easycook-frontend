import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ec-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
    constructor(private service: ProfileService, private route: ActivatedRoute) {}
    user: User = {} as User;
    notFound: boolean = false;
    id: string = '';

    ngOnInit(): void {
        //this.id = this.route.snapshot.paramMap.get('id')!; // Récupère l'ID depuis l'URL
        this.route.params.subscribe((params) => {
            this.id = params['id'];
            this.loadData();
        });
    }

    private loadData() {
        if (this.id) {
            // Load data for the userId, you can also use userData from the service
            // to combine with this.id and load related data
            this.service.getProfile(this.id).subscribe({
                next: (res: User) => {
                    res != null ? (this.user = res) : (this.notFound = true);
                    this.service.setUserData(this.user);
                },
                error: (err: any) => {
                    this.notFound = true;
                },
            });
        } else {
            this.notFound = true;
        }
    }
}
