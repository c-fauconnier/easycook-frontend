import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';

@Component({
    selector: 'app-lecture-form',
    templateUrl: './lecture-form.component.html',
    styleUrls: ['./lecture-form.component.scss'],
})
export class LectureFormComponent {
    // lectureForm = this.fb.group({
    //     title: '',
    //     duration: 0,
    //     difficulty: NaN,
    //     isCompleted: false,
    //     rating: NaN,
    //     chapters: [],
    // });
    // constructor(private fb: FormBuilder) {}
    lectureForm = this.fb.group({
        title: ['', Validators.required],
        duration: 0,
        difficulty: NaN,
        isCompleted: false,
        rating: NaN,
        chapters: this.fb.array([this.createChapter()]),
    });
    constructor(private fb: FormBuilder) {}

    ngOnInit() {}

    createChapter(): FormGroup {
        return this.fb.group({
            title: ['', Validators.required],
            paragraphs: this.fb.array([]),
        });
    }

    addChapter(): void {
        const chapters = this.lectureForm.get('chapters') as FormArray;
        chapters.push(this.createChapter());
    }

    addParagraph(chapterIndex: number): void {
        const chapters = this.lectureForm.get('chapters') as FormArray;
        const paragraphs = chapters.at(chapterIndex).get('paragraphs') as FormArray;
        paragraphs.push(this.fb.control('', Validators.required));
    }

    onSubmit(): void {
        // Récupérer les données du formulaire une fois soumis
        const formData = this.lectureForm.value;
        console.log(formData);
        // Envoyez les données au serveur, par exemple :
        // this.courseService.createCourse(formData).subscribe(...);
    }
}
