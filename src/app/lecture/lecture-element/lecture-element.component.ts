import { Component, Input, OnInit } from '@angular/core';
import { Lecture } from '../../shared/interfaces/lecture.interface';

@Component({
    selector: 'ec-lecture-element',
    templateUrl: './lecture-element.component.html',
    styleUrls: ['./lecture-element.component.scss'],
})
export class LectureElementComponent implements OnInit {
    @Input() lecture: Lecture = {} as Lecture;

    ngOnInit(): void {
        console.log(this.lecture);
    }
}
