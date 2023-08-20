import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectureFormComponent } from './lecture-form/lecture-form.component';
import { SharedModule } from '../shared/shared.module';
import { LectureViewComponent } from './lecture-view/lecture-view.component';
import { LectureListComponent } from './lecture-list/lecture-list.component';
import { LectureRoutingModule } from './lecture-routing.module';
import { LectureElementComponent } from './lecture-element/lecture-element.component';
import { LectureDetailsComponent } from './lecture-details/lecture-details.component';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';
import { ParagraphFormComponent } from './paragraph-form/paragraph-form.component';

@NgModule({
    declarations: [
        LectureFormComponent,
        LectureViewComponent,
        LectureListComponent,
        LectureElementComponent,
        LectureDetailsComponent,
        ChapterFormComponent,
        ParagraphFormComponent,
    ],
    imports: [CommonModule, SharedModule, LectureRoutingModule],
})
export class LectureModule {}
