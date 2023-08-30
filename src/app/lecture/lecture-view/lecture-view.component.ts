import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { LecturesService } from '../lectures.service';
import { Lecture } from '../../shared/interfaces/lecture.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ec-lecture-view',
    templateUrl: './lecture-view.component.html',
    styleUrls: ['./lecture-view.component.scss'],
})
export class LectureViewComponent implements OnInit {
    lectures: Lecture[] = [];
    filteredLectures: Lecture[] = [];
    url: string = '/lectures/form';
    text: string = 'Créer un cours';

    constructor(public service: LecturesService, private auth: AuthService, private route: ActivatedRoute, private router: Router) {}

    isConnected: boolean = false;
    isAdmin: boolean = this.auth.isAdmin();
    isLoading: boolean = false;
    noResult: boolean = false;

    totalPages: number;
    currentPage: number = 1; // Initialisée avec 1 par défaut
    limit: number = 9;

    ngOnInit(): void {
        // Calling auth service to know the connection state
        (this.auth as AuthService).isConnected$.subscribe({
            next: (isConnected: boolean) => {
                this.isConnected = isConnected;
            },
        });
        this.route.params.subscribe((params) => {
            const pageNumber = +params['index'];
            if (this.isConnected) this.loadPage(pageNumber);
        });
    }

    // Charge la page indiquée
    loadPage(pageNumber: number): void {
        this.service.getByIndex(pageNumber, this.limit).subscribe({
            next: (response) => {
                this.lectures = response.items;
                this.totalPages = response.totalPages;
                this.currentPage = pageNumber;
            },
        });
    }

    previousPage() {
        this.currentPage--;
        this.router.navigateByUrl(`/lectures/${this.currentPage}`);
    }

    nextPage() {
        this.currentPage++;
        this.router.navigateByUrl(`/lectures/${this.currentPage}`);
    }

    inputPage(index: number) {
        this.currentPage = index;
        this.router.navigateByUrl(`/lectures/${this.currentPage}`);
    }

    onResultChange(researchedLectures: { input: string; items: Lecture[] }) {
        if (!researchedLectures.input || !researchedLectures.input.length) {
            this.noResult = false;
            this.filteredLectures = [];
            return;
        } else if (researchedLectures.input && !researchedLectures.items.length) {
            this.noResult = true;
        } else {
            this.noResult = false;
            this.filteredLectures = researchedLectures.items;
        }
    }

    onLoadingLecturesChange(loading: boolean): void {
        this.isLoading = loading;
    }
}
