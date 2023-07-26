import { Chapter } from './chapter.interface';

export interface Lecture {
    id?: number;
    title: string;
    duration: number;
    difficulty: number;
    isCompleted: boolean;
    rating: number;
    chapters: Chapter[];
}
