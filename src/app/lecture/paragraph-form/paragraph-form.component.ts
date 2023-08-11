import { Component, Input } from '@angular/core';
import { Paragraph } from '../models/paragraph.model';

@Component({
    selector: 'ec-paragraph-form',
    templateUrl: './paragraph-form.component.html',
    styleUrls: ['./paragraph-form.component.scss'],
})
export class ParagraphFormComponent {
    @Input() paragraph: Paragraph = {} as Paragraph;
}
