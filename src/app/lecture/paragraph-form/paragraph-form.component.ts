import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Paragraph } from '../models/paragraph.model';

@Component({
    selector: 'ec-paragraph-form',
    templateUrl: './paragraph-form.component.html',
    styleUrls: ['./paragraph-form.component.scss'],
})
export class ParagraphFormComponent {
    _paragraph: Paragraph = new Paragraph();
    fileError: string;
    selectedFile: File | null;

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

    // Lorsque le fichier est modifié
    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            const allowedExtensions = ['.png', '.jpeg', '.jpg'];
            const fileExtension = this.selectedFile.name.split('.').pop()!.toLowerCase();

            if (allowedExtensions.includes('.' + fileExtension)) {
                // Le fichier a une extension autorisée, vous pouvez maintenant effectuer des actions
                // comme télécharger le fichier, valider le formulaire, etc.
                this._paragraph.media = this.selectedFile;
            } else {
                // Le fichier a une extension non autorisée, affichage de message d'erreur
                event.target.value = '';
                this.fileError = 'Extension de fichier non autorisée.';
            }
        }
    }

    onDelete(): void {
        this.deleteParagraph.emit();
    }
}
