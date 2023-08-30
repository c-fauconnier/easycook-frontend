import { Chapter } from './chapter.model';

export class Lecture {
    id?: string;
    title: string;
    description: string;
    duration: number;
    media: string;
    difficulty: number;
    isCompleted: boolean;
    rating?: number;
    chapters: Chapter[];

    constructor() {
        this.title = '';
        this.description = '';
        this.duration = 0;
        this.media =
            'https://firebasestorage.googleapis.com/v0/b/easycook-17888.appspot.com/o/Admin%2F2023-08-28T15-06-27.034Z-cropped_dark_logo.png?alt=media&token=64696cb6-3ac8-4b8d-bd87-e32c0e9acd5d';
        this.difficulty = 1;
        this.isCompleted = false;
        this.chapters = [];
    }
}
