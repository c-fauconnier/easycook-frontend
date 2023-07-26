import { Component, Input, OnInit } from '@angular/core';
import { Lecture } from '../../shared/interfaces/lecture.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'ec-lecture-element',
    templateUrl: './lecture-element.component.html',
    styleUrls: ['./lecture-element.component.scss'],
})
export class LectureElementComponent implements OnInit {
    @Input() lecture: Lecture = {} as Lecture;
    rating: number[] = [];

    constructor(private route: Router) {}
    ngOnInit(): void {
        for (let i = 0; i < Math.floor(this.lecture.rating); i++) {
            this.rating.push(1);
        }
    }

    goToLecturePage(): void {
        this.route.navigate([`lectures/${this.lecture.id}`]);
    }
}
