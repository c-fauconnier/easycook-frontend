import { Chapter } from './chapter.interface';

export interface Lecture {
    id?: number;
    title: string;
    description: string;
    duration: number;
    difficulty: number;
    isCompleted: boolean;
    rating: number;
    chapters: Chapter[];
}
