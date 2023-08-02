import { Component, Input } from '@angular/core';
import { Chapter } from '../models/chapter.model';
import { Paragraph } from '../models/paragraph.model';

@Component({
    selector: 'ec-chapter-form',
    templateUrl: './chapter-form.component.html',
    styleUrls: ['./chapter-form.component.scss'],
})
export class ChapterFormComponent {
    @Input() set chapterNumber(number: number) {
        this.chapter.number = number;
    }
    chapter: Chapter = new Chapter();

    newParagraph: Paragraph = {} as Paragraph;

    onChapterTitleChange(title: string): void {
        if (title) this.chapter.title = title;
    }
    onCreateNewParagraph(): void {}
    onValidateParagraph(): void {}
    onValidateChapter(): void {}
}
