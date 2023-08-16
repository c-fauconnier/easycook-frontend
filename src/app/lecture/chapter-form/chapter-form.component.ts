import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Chapter } from '../models/chapter.model';
import { Paragraph } from '../models/paragraph.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ec-chapter-form',
    templateUrl: './chapter-form.component.html',
    styleUrls: ['./chapter-form.component.scss'],
})
export class ChapterFormComponent {
    _chapter: Chapter = new Chapter();

    @Input() index: number;
    @Input() set chapter(chapter: Chapter) {
        this._chapter = chapter;
        this._chapter.index = this.index + 1;
    }
    @Output() deleteChapter: EventEmitter<void> = new EventEmitter<void>();

    // Ajouter un paragraphe dans le tableau de chapterForm.paragraphs
    addParagraph() {
        const paragraphs = this._chapter.paragraphs;
        paragraphs.push(this.createParagraph());
    }

    removeParagraph(index: number) {
        let paragraphs = this._chapter.paragraphs;

        if (index >= 0 && index < paragraphs.length) {
            paragraphs.splice(index, 1);
        }

        // Recalculer les index des paragraphes restants
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].index = i + 1;
        }
    }

    removeAllParagraphs(): void {
        const userConfirm = confirm('Êtes-vous sûr de vouloir supprimer tous les paragraphes ?');
        if (userConfirm) {
            this._chapter.paragraphs = [];
        }
    }

    // getter du tableau des paragraphes
    paragraphs(): Paragraph[] {
        return this._chapter.paragraphs;
    }

    private createParagraph(): Paragraph {
        return new Paragraph();
    }

    // Méthode pour mettre à jour le titre du formulaire
    onTitleChange(title: any): void {
        this._chapter.title = title;
    }
    // Méthode pour mettre à jour le champ media du formulaire
    onMediaChange(media: any): void {
        this._chapter.media = media;
    }

    // updateChapter(paragraph: Paragraph): void {
    //     this._chapter.paragraphs;
    // }

    onDelete(): void {
        this.deleteChapter.emit();
    }
}
