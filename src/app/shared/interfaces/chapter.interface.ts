import { Lecture } from './lecture.interface';
import { Paragraph } from './paragraph.interface';

export interface Chapter {
    number: number;
    title: string;
    isCompleted: boolean;
    video?: string;
    lecture: Lecture;
    paragraphs: Paragraph[];
}
