import { Component, OnInit } from '@angular/core';
import { FavoriteLectures } from 'src/app/shared/interfaces/favorite-lectures.interface';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap } from 'rxjs';
import { LecturesService } from 'src/app/lecture/lectures.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ec-profile-favorite-lectures',
    templateUrl: './profile-favorite-lectures.component.html',
    styleUrls: ['./profile-favorite-lectures.component.scss'],
})
export class ProfileFavoriteLecturesComponent implements OnInit {
    favoriteLectures: FavoriteLectures[];
    userId: string = this.auth.user.id;

    constructor(
        private service: ProfileService,
        private auth: AuthService,
        private lectureService: LecturesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.service.getUserFavoriteLectures().subscribe({
            next: (res: FavoriteLectures[]) => {
                this.favoriteLectures = res;
            },
        });
    }

    deleteFromMyLectures(recipeId: string) {
        const userConfirm = confirm('Voulez-vous retirer ce cours de vos favoris ?');
        if (userConfirm) {
            this.lectureService
                .deleteFromMyFavorites(recipeId)
                .pipe(
                    switchMap((res) => {
                        this.toastr.success('Cours retiré des favoris');
                        return this.service.getUserFavoriteLectures();
                    })
                )
                .subscribe({
                    next: (res: FavoriteLectures[]) => {
                        this.favoriteLectures = res;
                    },
                });
        }
    }
}
