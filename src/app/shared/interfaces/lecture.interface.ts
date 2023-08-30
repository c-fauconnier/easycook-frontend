import { Chapter } from './chapter.interface';

export interface Lecture {
    id: string;
    title: string;
    description: string;
    duration: number;
    difficulty: number;
    media: string;
    isCompleted: boolean;
    rating: number;
    chapters: Chapter[];
    createdAt?: Date | null;
}
