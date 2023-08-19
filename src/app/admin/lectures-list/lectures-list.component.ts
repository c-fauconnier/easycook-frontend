import { Component, Input } from '@angular/core';
import { Lecture } from 'src/app/lecture/models/lecture.model';

@Component({
    selector: 'ec-lectures-list',
    templateUrl: './lectures-list.component.html',
    styleUrls: ['./lectures-list.component.scss'],
})
export class LecturesListComponent {
    @Input() lectures: Lecture[] = [];
}
