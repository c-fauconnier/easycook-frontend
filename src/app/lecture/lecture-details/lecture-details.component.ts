import { switchMap, Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lecture } from '../../shared/interfaces/lecture.interface';
import { LecturesService } from '../lectures.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'ec-lecture-details',
    templateUrl: './lecture-details.component.html',
    styleUrls: ['./lecture-details.component.scss'],
})
export class LectureDetailsComponent implements OnInit {
    lecture: Lecture = {} as Lecture;
    selectedChapter: number | null = null;
    isConnected: boolean = false;
    isFavorite: boolean = false;
    lectureId: string;
    isLoading: boolean = false;
    constructor(route: ActivatedRoute, private service: LecturesService, private auth: AuthService, private toastr: ToastrService) {
        this.lectureId = route.snapshot.params['id'];
        service
            .get(this.lectureId)
            .pipe(
                switchMap((lecture: Lecture) => {
                    this.lecture = lecture;
                    return service.isMyFavorite(this.lectureId);
                })
            )
            .subscribe({
                next: (isfav: boolean) => {
                    this.isFavorite = isfav;
                },
            });
    }

    ngOnInit(): void {
        if (this.auth.user) {
            this.isConnected = true;
        }
    }

    selectChapter(chapterIndex: number): void {
        this.selectedChapter = chapterIndex;
    }

    addToFavorites() {
        this.isLoading = true;
        this.service.addToFavorites(this.lectureId).subscribe({
            next: (res) => {
                this.isFavorite = !this.isFavorite;
                this.toastr.success('Cours ajouté aux favoris');
                this.isLoading = false;
            },
        });
    }

    deleteFromMyFavorites() {
        this.isLoading = true;
        this.service.deleteFromMyFavorites(this.lectureId).subscribe({
            next: (res) => {
                this.isFavorite = !this.isFavorite;
                this.toastr.success('Cours retiré des favoris');
                this.isLoading = false;
            },
        });
    }
}
