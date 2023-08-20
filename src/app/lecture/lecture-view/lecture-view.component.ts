import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { LecturesService } from '../lectures.service';
import { Lecture } from '../../shared/interfaces/lecture.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ec-lecture-view',
    templateUrl: './lecture-view.component.html',
    styleUrls: ['./lecture-view.component.scss'],
})
export class LectureViewComponent implements OnInit {
    lectures: Lecture[] = [];
    url: string = '/lecture/form';
    text: string = 'Créer un cours';

    constructor(private service: LecturesService, private auth: AuthService) {}

    isConnected: boolean = false;
    isAdmin: boolean = this.auth.isAdmin();

    ngOnInit(): void {
        // Calling auth service to know the connection state
        (this.auth as AuthService).isConnected$.subscribe({
            next: (isConnected: boolean) => {
                this.isConnected = isConnected;
            },
        });
        // If we are connected then we call the get API to obtain our Lecture[]
        if (this.isConnected) {
            this.service.getAll().subscribe({
                next: (res: Lecture[]) => {
                    this.lectures = res;
                },
            });
        }
    }
}
