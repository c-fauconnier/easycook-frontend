import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoRoomComponent } from './video-room/video-room.component';

const routes: Routes = [
    {
        path: '',
        component: VideoRoomComponent,
    },
    // {
    //     path: 'form',
    //     component: LectureFormComponent,
    // },
    // {
    //     path: ':id',
    //     component: LectureDetailsComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VideoCallRoutingModule {}
