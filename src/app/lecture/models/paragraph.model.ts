export class Paragraph {
    index: number;
    content: string;
    media?: string | File;

    constructor() {
        this.index = NaN;
        this.content = '';
        this.media = '';
    }
}
