import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Paragraph } from '../models/paragraph.model';

@Component({
    selector: 'ec-paragraph-form',
    templateUrl: './paragraph-form.component.html',
    styleUrls: ['./paragraph-form.component.scss'],
})
export class ParagraphFormComponent {
    _paragraph: Paragraph = new Paragraph();

    @Input() index: number;
    @Input() set paragraph(paragraph: Paragraph) {
        this._paragraph = paragraph;
        this._paragraph.index = this.index + 1;
    }
    //@Output() paragraphChange: EventEmitter<Paragraph> = new EventEmitter<Paragraph>();
    @Output() deleteParagraph: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    onContentChange(content: string): void {
        this._paragraph.content = content;
        //this.paragraphChange.emit(this._paragraph);
    }

    onDelete(): void {
        this.deleteParagraph.emit();
    }
}
