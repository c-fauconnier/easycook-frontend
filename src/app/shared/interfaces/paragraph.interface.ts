import { Chapter } from './chapter.interface';

export interface Paragraph {
    index: number;
    content: string;
    chapter: Chapter;
}
