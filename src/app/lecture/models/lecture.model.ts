import { Chapter } from './chapter.model';

export class Lecture {
    id?: number;
    title: string;
    description: string;
    duration: number;
    difficulty: number;
    isCompleted: boolean;
    rating?: number;
    chapters: Chapter[];

    constructor() {
        this.title = '';
        this.description = '';
        this.duration = 0;
        this.difficulty = 1;
        this.isCompleted = false;
        this.chapters = [];
    }
}
