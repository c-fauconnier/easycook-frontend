import { Component, Input, OnInit } from '@angular/core';
import { Lecture } from '../../shared/interfaces/lecture.interface';

@Component({
    selector: 'ec-lecture-list',
    templateUrl: './lecture-list.component.html',
    styleUrls: ['./lecture-list.component.scss'],
})
export class LectureListComponent  {
    @Input() lectures: Lecture[] = [];

    
}
