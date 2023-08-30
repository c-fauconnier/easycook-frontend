import { Lecture } from './lecture.interface';
import { Paragraph } from './paragraph.interface';

export interface Chapter {
    index: number;
    title: string;
    isCompleted: boolean;
    media?: string;
    lecture: Lecture;
    paragraphs: Paragraph[];
}
