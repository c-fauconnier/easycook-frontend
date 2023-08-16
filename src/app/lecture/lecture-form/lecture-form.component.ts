import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { LecturesService } from '../lectures.service';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Chapter } from '../models/chapter.model';
import { Lecture } from '../models/lecture.model';

@Component({
    selector: 'ec-lecture-form',
    templateUrl: './lecture-form.component.html',
    styleUrls: ['./lecture-form.component.scss'],
})
export class LectureFormComponent implements OnInit {
    lectureForm: FormGroup;
    _lecture: Lecture = new Lecture();
    constructor(private fb: FormBuilder) {}
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
        //const chapters = this.lectureForm.get('chapters') as FormArray;
        //chapters.push(this.createChapter());

        let chapters = this._lecture.chapters;
        chapters.push(this.createChapter());
    }

    // supprime un élément du tableau sur base de son index
    removeChapter(index: number) {
        // const chapters = this.lectureForm.get('chapters') as FormArray;
        // chapters.removeAt(index);

        // // Recalculer les index des chapitres restants
        // for (let i = 0; i < chapters.length; i++) {
        //     chapters
        //         .at(i)
        //         .get('index')
        //         ?.setValue(i + 1);
        // }
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
        // const chapters = this.lectureForm.get('chapters') as FormArray;
        // while (chapters.length !== 0) {
        //     chapters.removeAt(0);
        const userConfirm = confirm('Êtes-vous sûr de vouloir supprimer tous les chapitres ?');
        if (userConfirm) {
            this._lecture.chapters = [];
        }
    }

    // getter du tableau des chapitres
    chapters(): Chapter[] {
        //return this.lectureForm.get('chapters') as FormArray;
        return this._lecture.chapters;
    }

    // private createChapter(): FormGroup {
    //     return this.fb.group({
    //         title: ['', Validators.required],
    //         isCompleted: [false],
    //         media: [''],
    //         paragraphs: this.fb.array([]),
    //     });
    // }

    private createChapter(): Chapter {
        return new Chapter();
    }

    onSubmit(): void {
        this.lectureForm.value.chapters = this._lecture.chapters;
        if (this.lectureForm.valid) {
            const lecture: Lecture = this.lectureForm.value;
            console.log(lecture);

            // Faire quelque chose avec la conférence saisie, par exemple l'envoyer au serveur
        }
    }
}
