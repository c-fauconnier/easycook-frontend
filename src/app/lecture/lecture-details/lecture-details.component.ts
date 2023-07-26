import { switchMap, Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lecture } from '../../shared/interfaces/lecture.interface';
import { LecturesService } from '../lectures.service';

@Component({
    selector: 'ec-lecture-details',
    templateUrl: './lecture-details.component.html',
    styleUrls: ['./lecture-details.component.scss'],
})
export class LectureDetailsComponent implements OnInit {
    lecture: Lecture = {} as Lecture;

    constructor(route: ActivatedRoute, private service: LecturesService) {
        const lectureId = route.snapshot.params['id'];
        service.get(lectureId).subscribe({
            next: (lecture: Lecture) => {
                this.lecture = lecture;
            },
        });
    }

    ngOnInit(): void {}
}
