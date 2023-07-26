import { Component, OnInit } from '@angular/core';
import { LecturesService } from '../lectures.service';
import { Lecture } from '../../shared/interfaces/lecture.interface';

@Component({
    selector: 'ec-lecture-view',
    templateUrl: './lecture-view.component.html',
    styleUrls: ['./lecture-view.component.scss'],
})
export class LectureViewComponent implements OnInit {
    lectures: Lecture[] = [];

    constructor(private service: LecturesService) {}

    ngOnInit(): void {
        this.service.getAll().subscribe({
            next: (res: Lecture[]) => {
                this.lectures = res;
            },
        });
    }
}
