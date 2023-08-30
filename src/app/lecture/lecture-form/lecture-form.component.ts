import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { LecturesService } from '../lectures.service';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Chapter } from '../models/chapter.model';
import { Lecture } from '../models/lecture.model';
import { ToastrService } from 'ngx-toastr';
import { Upload } from 'src/app/shared/interfaces/upload.interface';
@Component({
    selector: 'ec-lecture-form',
    templateUrl: './lecture-form.component.html',
    styleUrls: ['./lecture-form.component.scss'],
})
export class LectureFormComponent implements OnInit {
    lectureForm: FormGroup;
    _lecture: Lecture = new Lecture();
    errors: {};
    fileError: string;
    selectedFile: File | null;
    showContent: boolean = true;
    buttonText: string = 'Cacher les chapitres';
    difficultyOptions = [
        { value: 1, label: 'Très facile' },
        { value: 2, label: 'Facile' },
        { value: 3, label: 'Moyen' },
        { value: 4, label: 'Difficile' },
        { value: 5, label: 'Très difficile' },
    ];

    toggleContent() {
        this.showContent = !this.showContent;
        this.buttonText = this.showContent ? 'Cacher les chapitres' : 'Afficher les chapitres';
    }

    constructor(private fb: FormBuilder, private service: LecturesService, private toastr: ToastrService) {}

    showCustomNotification() {
        this.toastr.success('Cours créé !', 'Succès', {
            positionClass: 'toast-center', // Définit la position au centre en haut
            timeOut: 3000, // Durée d'affichage de la notification en millisecondes (3 secondes dans cet exemple)
            progressBar: true, // Affiche une barre de progression
            progressAnimation: 'increasing', // Animation de la barre de progression
        });
    }

    ngOnInit(): void {
        this.initForm();
    }

    // initialisation du formulaire avec des données
    initForm(): void {
        this.lectureForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            duration: [0, [Validators.required, Validators.min(1)]],
            media: [this._lecture.media],
            difficulty: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
            chapters: this.fb.array([]),
        });
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
            } else {
                // Le fichier a une extension non autorisée, affichage de message d'erreur
                event.target.value = '';
                this.fileError = 'Extension de fichier non autorisée.';
            }
        }
    }

    // Ajouter un paragraphe dans le tableau de lectureForm.chapters
    addChapter() {
        let chapters = this._lecture.chapters;
        chapters.push(this.createChapter());
    }

    // supprime un élément du tableau sur base de son index
    removeChapter(index: number) {
        let paragraphs = this._lecture.chapters;

        if (index >= 0 && index < paragraphs.length) {
            paragraphs.splice(index, 1);
        }

        // Recalculer les index des paragraphes restants
        for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].index = i + 1;
        }
    }

    // supprime le tableau de chapitres
    removeAllChapters() {
        const userConfirm = confirm('Êtes-vous sûr de vouloir supprimer tous les chapitres ?');
        if (userConfirm) {
            this._lecture.chapters = [];
        }
    }

    // getter du tableau des chapitres
    chapters(): Chapter[] {
        return this._lecture.chapters;
    }

    // créé une instance Chapter
    private createChapter(): Chapter {
        return new Chapter();
    }

    async onSubmit(): Promise<void> {
        this.lectureForm.value.chapters = this._lecture.chapters;
        if (this.lectureForm.valid) {
            let lecture = this.lectureForm.value;

            //Création de fichiers sur firebase pour les images des paragraphes
            // for (let chapter of lecture.chapters) {
            //     for (let paragraph of chapter.paragraphs) {
            //         if (paragraph.media) {
            //             const formData = new FormData();
            //             formData.append('media', paragraph.media);
            //             this.service.uploadImage(formData, 'lectures').subscribe({
            //                 next: (res: Upload) => {
            //                     paragraph.media = res.url;
            //                 },
            //             });
            //         }
            //     }
            // }

            const formData = new FormData();
            if (this.selectedFile) {
                formData.append('media', this.selectedFile);
                this.service
                    .uploadImage(formData, 'lectures')
                    .pipe(
                        switchMap((res: Upload) => {
                            lecture.media = res.url;
                            return this.service.create(lecture);
                        })
                    )
                    .subscribe({
                        next: (lecture: Lecture) => {
                            this.removeAllChapters();
                            this.lectureForm.reset();
                            this.toastr.success('Cours crée');
                        },
                    });
            } else {
                this.service.create(lecture).subscribe({
                    next: (lecture: Lecture) => {
                        this.removeAllChapters();
                        this.lectureForm.reset();
                        this.toastr.success('Cours crée');
                    },
                });
            }
        }
    }
}
