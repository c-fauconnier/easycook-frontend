import { Lecture } from './lecture.interface';

export interface FavoriteLectures {
    id: number;
    deletedAt: Date | null;
    updatedAt: Date;
    createdAt: Date;
    lecture: Lecture;
}
