import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LectureFormComponent } from './lecture-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LecturesService } from '../lectures.service';
import { of } from 'rxjs';

describe('LectureFormComponent', () => {
    let component: LectureFormComponent;
    let fixture: ComponentFixture<LectureFormComponent>;

    const mockToastrService = {
        success: jasmine.createSpy('success'),
    };

    const mockLecturesService = {
        addLecture: jasmine.createSpy('addLecture').and.returnValue(of({})),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [LectureFormComponent],
            providers: [
                FormBuilder,
                { provide: ToastrService, useValue: mockToastrService },
                { provide: LecturesService, useValue: mockLecturesService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LectureFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // You can add more test cases here
    // For example, test methods like addChapter(), removeChapter(), onSubmit(), etc.

    it('should show success notification on successful lecture submission', () => {
        const lecture = {
            title: 'Test Lecture',
            description: 'Test Description',
            duration: 60,
            difficulty: 3,
            chapters: [],
        };

        component.lectureForm.setValue(lecture);
        component.onSubmit();

        expect(mockLecturesService.addLecture).toHaveBeenCalled();
        expect(mockToastrService.success).toHaveBeenCalledWith('Cours créé !', 'Succès', jasmine.any(Object));
    });
});
