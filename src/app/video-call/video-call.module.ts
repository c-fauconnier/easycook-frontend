import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRoomComponent } from './video-room/video-room.component';
import { VideoCallRoutingModule } from './video-call-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [VideoRoomComponent],
    imports: [CommonModule, VideoCallRoutingModule, SharedModule],
})
export class VideoCallModule {}
