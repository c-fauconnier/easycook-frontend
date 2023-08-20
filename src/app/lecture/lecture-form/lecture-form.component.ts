import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { LecturesService } from '../lectures.service';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Chapter } from '../models/chapter.model';
import { Lecture } from '../models/lecture.model';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'ec-lecture-form',
    templateUrl: './lecture-form.component.html',
    styleUrls: ['./lecture-form.component.scss'],
})
export class LectureFormComponent implements OnInit {
    lectureForm: FormGroup;
    _lecture: Lecture = new Lecture();
    errors: {};
    showContent: boolean = true;
    buttonText: string = 'Cacher les chapitres';

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

    initForm(): void {
        this.lectureForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            duration: [0, [Validators.required, Validators.min(1)]],
            difficulty: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
            chapters: this.fb.array([]),
        });
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

    private createChapter(): Chapter {
        return new Chapter();
    }

    onSubmit(): void {
        this.lectureForm.value.chapters = this._lecture.chapters;
        if (this.lectureForm.valid) {
            const lecture = this.lectureForm.value;
            console.log(lecture);

            this.service.addLecture(lecture).subscribe({
                next: (res: Lecture) => {
                    this.showCustomNotification();
                    location.reload();
                    return;
                },
                error: (err: any) => {
                    console.log(err.error.errors);
                    this.errors = err.error.errors[0].message;
                    return;
                },
            });
        }
    }
}
