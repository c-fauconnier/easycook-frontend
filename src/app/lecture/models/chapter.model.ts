import { Paragraph } from './paragraph.model';

export class Chapter {
    number: number;
    title: string;
    isCompleted: boolean;
    video?: string;
    paragraph: Paragraph[];
    constructor() {
        this.number = NaN;
        this.title = '';
        this.isCompleted = false;
        this.paragraph = [];
    }
}
