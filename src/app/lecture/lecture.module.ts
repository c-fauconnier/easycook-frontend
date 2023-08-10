import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectureFormComponent } from './lecture-form/lecture-form.component';
import { SharedModule } from '../shared/shared.module';
import { LectureViewComponent } from './lecture-view/lecture-view.component';
import { LectureListComponent } from './lecture-list/lecture-list.component';
import { LectureRoutingModule } from './lecture-routing.module';
import { LectureElementComponent } from './lecture-element/lecture-element.component';
import { LectureDetailsComponent } from './lecture-details/lecture-details.component';
import { FormsModule } from '@angular/forms';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';

@NgModule({
    declarations: [
        LectureFormComponent,
        LectureViewComponent,
        LectureListComponent,
        LectureElementComponent,
        LectureDetailsComponent,
        ChapterFormComponent,
    ],
    imports: [CommonModule, SharedModule, LectureRoutingModule, FormsModule],
})
export class LectureModule {}
