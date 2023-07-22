import { Chapter } from './chapter.interface';

export interface Lecture {
    title: string;
    duration: number;
    difficulty: number;
    isCompleted: boolean;
    rating: number;
    chapters: Chapter[];
}
