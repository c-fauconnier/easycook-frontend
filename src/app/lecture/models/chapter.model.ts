import { Paragraph } from './paragraph.model';

export class Chapter {
    index: number;
    title: string;
    isCompleted: boolean;
    media?: string;
    paragraphs: Paragraph[];
    constructor() {
        this.index = NaN;
        this.title = '';
        this.isCompleted = false;
        this.paragraphs = [];
    }
}
