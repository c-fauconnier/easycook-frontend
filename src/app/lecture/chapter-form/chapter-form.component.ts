import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Chapter } from '../models/chapter.model'; // Import du modèle Chapter
import { Paragraph } from '../models/paragraph.model'; // Import du modèle Paragraph
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import des dépendances pour les formulaires

@Component({
    selector: 'ec-chapter-form', // Sélecteur personnalisé pour ce composant
    templateUrl: './chapter-form.component.html', // Chemin vers le template HTML
    styleUrls: ['./chapter-form.component.scss'], // Chemin vers les fichiers de style
})
export class ChapterFormComponent {
    _chapter: Chapter = new Chapter(); // Instance de Chapter pour stocker les données du chapitre

    @Input() index: number; // Entrée : numéro d'index du chapitre
    @Input() set chapter(chapter: Chapter) {
        // Entrée : chapitre fourni
        this._chapter = chapter; // Mettre à jour les données du chapitre
        this._chapter.index = this.index + 1; // Mettre à jour l'index du chapitre
    }
    @Output() deleteChapter: EventEmitter<void> = new EventEmitter<void>(); // Émetteur d'événement pour supprimer le chapitre

    showContent: boolean = true; // Variable pour contrôler l'affichage des paragraphes
    buttonText: string = 'Cacher les paragraphes'; // Texte du bouton pour basculer l'affichage

    // Méthode pour basculer l'affichage des paragraphes
    toggleContent() {
        this.showContent = !this.showContent; // Inverser l'état d'affichage
        this.buttonText = this.showContent ? 'Cacher les paragraphes' : 'Afficher les paragraphes'; // Mettre à jour le texte du bouton
    }

    // Méthode pour ajouter un paragraphe dans le tableau de paragraphes
    addParagraph() {
        const paragraphs = this._chapter.paragraphs; // Obtenir le tableau de paragraphes
        paragraphs.push(this.createParagraph()); // Ajouter un nouveau paragraphe à la fin
    }

    // Méthode pour supprimer un paragraphe
    removeParagraph(index: number) {
        let paragraphs = this._chapter.paragraphs; // Obtenir le tableau de paragraphes

        if (index >= 0 && index < paragraphs.length) {
            paragraphs.splice(index, 1); // Supprimer le paragraphe à l'index donné
        }

        // Recalculer les index des paragraphes restants
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].index = i + 1; // Mettre à jour les index
        }
    }

    // Méthode pour supprimer tous les paragraphes avec confirmation de l'utilisateur
    removeAllParagraphs(): void {
        const userConfirm = confirm('Êtes-vous sûr de vouloir supprimer tous les paragraphes ?');
        if (userConfirm) {
            this._chapter.paragraphs = []; // Vider le tableau de paragraphes
        }
    }

    // Méthode pour obtenir le tableau des paragraphes
    paragraphs(): Paragraph[] {
        return this._chapter.paragraphs; // Renvoyer le tableau de paragraphes
    }

    // Méthode pour créer un nouvel objet Paragraph
    createParagraph(): Paragraph {
        return new Paragraph(); // Créer et renvoyer un nouvel objet de paragraphe
    }

    // Méthode pour mettre à jour le titre du chapitre
    onTitleChange(title: any): void {
        this._chapter.title = title; // Mettre à jour le titre du chapitre avec la valeur entrée
    }

    // Méthode pour mettre à jour le champ de lien vidéo
    onMediaChange(media: any): void {
        this._chapter.media = media; // Mettre à jour le champ media avec la valeur entrée
    }

    // Méthode pour émettre l'événement de suppression du chapitre
    onDelete(): void {
        this.deleteChapter.emit(); // Émettre l'événement de suppression du chapitre
    }
}
