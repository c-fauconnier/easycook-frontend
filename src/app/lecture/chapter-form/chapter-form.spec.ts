import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterFormComponent } from './chapter-form.component';
import { Chapter } from '../models/chapter.model';
import { Paragraph } from '../models/paragraph.model';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ChapterFormComponent', () => {
    let component: ChapterFormComponent;
    let fixture: ComponentFixture<ChapterFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChapterFormComponent],
            imports: [SharedModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChapterFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle content visibility and update button text', () => {
        component.toggleContent();
        expect(component.showContent).toBe(false);
        expect(component.buttonText).toBe('Afficher les paragraphes');

        component.toggleContent();
        expect(component.showContent).toBe(true);
        expect(component.buttonText).toBe('Cacher les paragraphes');
    });

    it('should add a paragraph', () => {
        const initialParagraphCount = component.paragraphs().length;
        component.addParagraph();
        expect(component.paragraphs().length).toBe(initialParagraphCount + 1);
    });

    it('should remove a paragraph', () => {
        const initialParagraphCount = component.paragraphs().length;
        component.addParagraph(); // Add a paragraph
        component.removeParagraph(0); // Remove the added paragraph
        expect(component.paragraphs().length).toBe(initialParagraphCount);
    });

    it('should remove all paragraphs', () => {
        const initialParagraphCount = component.paragraphs().length;
        component.addParagraph();
        component.addParagraph();
        component.removeAllParagraphs(); // Remove all paragraphs
        expect(component.paragraphs().length).toBe(0);
    });

    it('should create a paragraph', () => {
        const paragraph = component.createParagraph();
        expect(paragraph).toBeTruthy();
        expect(paragraph instanceof Paragraph).toBe(true);
    });

    it('should update chapter title on title change', () => {
        const newTitle = 'New Title';
        component.onTitleChange(newTitle);
        expect(component._chapter.title).toBe(newTitle);
    });

    it('should update chapter media on media change', () => {
        const newMedia = 'https://example.com';
        component.onMediaChange(newMedia);
        expect(component._chapter.media).toBe(newMedia);
    });

    it('should emit deleteChapter event on delete', () => {
        let deleteEventEmitted = false;
        component.deleteChapter.subscribe(() => {
            deleteEventEmitted = true;
        });
        component.onDelete();
        expect(deleteEventEmitted).toBe(true);
    });
});
