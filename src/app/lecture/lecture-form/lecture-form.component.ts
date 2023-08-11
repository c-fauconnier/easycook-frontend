import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { LecturesService } from '../lectures.service';
import { Lecture } from '../../shared/interfaces/lecture.interface';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Chapter } from '../models/chapter.model';

@Component({
    selector: 'ec-lecture-form',
    templateUrl: './lecture-form.component.html',
    styleUrls: ['./lecture-form.component.scss'],
})
export class LectureFormComponent {
    // lecture: Lecture = {} as Lecture;
    // isLectureTitleAlreadyTaken: boolean = false;
    // private _lectureTitleSearch$ = new Subject<string>();
    // isNewChapterFormOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // _isNewChapterFormOpen: boolean = this.isNewChapterFormOpen$.getValue();

    constructor(private fb: FormBuilder, private service: LecturesService) {}
    courseForm = this.fb.group({
        title: [''],
        description: [''],
        date: [''],
        duration: [''],
        chapters: this.fb.array([]), // Utilisation de FormArray pour les chapitres
    });

    get chaptersFormArray() {
        return this.courseForm.get('chapters') as FormArray;
    }

    addChapter() {
        const chapterFormGroup = this.fb.group(new Chapter());
        this.chaptersFormArray.push(chapterFormGroup);
    }

    removeChapter(index: number) {
        this.chaptersFormArray.removeAt(index);
    }

    moveChapterUp(index: number) {
        if (index > 0) {
            const chapter = this.chaptersFormArray.at(index);
            this.chaptersFormArray.removeAt(index);
            this.chaptersFormArray.insert(index - 1, chapter);
        }
    }

    moveChapterDown(index: number) {
        if (index < this.chaptersFormArray.length - 1) {
            const chapter = this.chaptersFormArray.at(index);
            this.chaptersFormArray.removeAt(index);
            this.chaptersFormArray.insert(index + 1, chapter);
        }
    }
    onSubmit() {
        console.log(this.courseForm.value);
    }
    // ngOnInit() {
    //     this._lectureTitleSearch$
    //         .pipe(
    //             debounceTime(1000),
    //             distinctUntilChanged(),
    //             switchMap((res) => {
    //                 return this.service.verifyTitle(res);
    //             })
    //         )
    //         .subscribe({
    //             next: (val) => {
    //                 this.isLectureTitleAlreadyTaken = val;
    //             },
    //         });
    //     this.isNewChapterFormOpen$.subscribe({
    //         next: (bool) => {
    //             this._isNewChapterFormOpen = bool;
    //         },
    //     });
    // }

    // onLectureTitleChange(search: string): void {
    //     if (search && search.length > 1) {
    //         this._lectureTitleSearch$.next(search);

    //         if (!this.isLectureTitleAlreadyTaken) {
    //             this.lecture.title = search;
    //         }
    //     }
    // }

    // onDurationChange(during: string): void {
    //     if (during) this.lecture.duration = +during;
    // }

    // onDescriptionChange(description: string): void {
    //     if (description.length > 5) this.lecture.description = description;
    // }

    // onCreateNewChapter(): void {
    //     if (!this._isNewChapterFormOpen) {
    //         this.isNewChapterFormOpen$.next(true);
    //     }
    // }
}
