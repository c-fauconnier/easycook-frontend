import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { VideoService } from '../service/video.service';
import { environment } from 'src/app/environments/environment.video';

// export const ENV_RTCPeerConfiguration = environment.RTCPeerConfiguration;

// const mediaConstraints = {
//     audio: true,
//     //video: { width: 1280, height: 720 },
//     // video: {width: 1280, height: 720} // 16:9
//     // video: {width: 960, height: 540}  // 16:9
//     video: { width: 640, height: 480 }, //  4:3
//     // video: {width: 160, height: 120}  //  4:3
// };

// const offerOptions = {
//     offerToReceiveAudio: true,
//     offerToReceiveVideo: true,
// };

@Component({
    selector: 'ec-video-room',
    templateUrl: './video-room.component.html',
    styleUrls: ['./video-room.component.scss'],
})
export class VideoRoomComponent implements OnInit {
    isConnected: boolean = false;

    // @ViewChild('local_video') localVideo: ElementRef;
    // @ViewChild('received_video') remoteVideo: ElementRef;

    // private peerConnection: RTCPeerConnection;

    // private localStream: MediaStream;

    // inCall = false;
    // localVideoActive = false;

    constructor(private auth: AuthService, private fb: FormBuilder, private videoService: VideoService) {}

    ngOnInit(): void {
        // Calling auth service to know the connection state
        (this.auth as AuthService).isConnected$.subscribe({
            next: (isConnected: boolean) => {
                this.isConnected = isConnected;
            },
        });
    }

    // title = 'EasyCook video room';
    // conversationFormGroup = this.fb.group({
    //     name: this.fb.control('', [Validators.required]),
    // });

    // get conversationNameFc(): FormControl {
    //     return this.conversationFormGroup.get('name') as FormControl;
    // }
    // async call(): Promise<void> {
    //     this.createPeerConnection();

    //     // Add the tracks from the local stream to the RTCPeerConnection
    //     this.localStream.getTracks().forEach((track) => this.peerConnection.addTrack(track, this.localStream));

    //     try {
    //         const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
    //         // Establish the offer as the local peer's current description.
    //         await this.peerConnection.setLocalDescription(offer);

    //         this.inCall = true;

    //         this.videoService.sendMessage({ type: 'offer', data: offer });
    //     } catch (err: any) {
    //         this.handleGetUserMediaError(err);
    //     }
    // }

    // hangUp(): void {
    //     this.videoService.sendMessage({ type: 'hangup', data: '' });
    //     this.closeVideoCall();
    // }

    // ngAfterViewInit(): void {
    //     this.addIncominMessageHandler();
    //     this.requestMediaDevices();
    // }

    // private addIncominMessageHandler(): void {
    //     this.videoService.connect();

    //     // this.transactions$.subscribe();
    //     this.videoService.messages$.subscribe(
    //         (msg: any) => {
    //             // console.log('Received message: ' + msg.type);
    //             switch (msg.type) {
    //                 case 'offer':
    //                     this.handleOfferMessage(msg.data);
    //                     break;
    //                 case 'answer':
    //                     this.handleAnswerMessage(msg.data);
    //                     break;
    //                 case 'hangup':
    //                     this.handleHangupMessage(msg);
    //                     break;
    //                 case 'ice-candidate':
    //                     this.handleICECandidateMessage(msg.data);
    //                     break;
    //                 default:
    //                     console.log('unknown message of type ' + msg.type);
    //             }
    //         },
    //         (error: any) => console.log(error)
    //     );
    // }

    // /* ########################  MESSAGE HANDLER  ################################## */

    // private handleOfferMessage(msg: RTCSessionDescriptionInit): void {
    //     console.log('handle incoming offer');
    //     if (!this.peerConnection) {
    //         this.createPeerConnection();
    //     }

    //     if (!this.localStream) {
    //         this.startLocalVideo();
    //     }

    //     this.peerConnection
    //         .setRemoteDescription(new RTCSessionDescription(msg))
    //         .then(() => {
    //             // add media stream to local video
    //             this.localVideo.nativeElement.srcObject = this.localStream;

    //             // add media tracks to remote connection
    //             this.localStream.getTracks().forEach((track) => this.peerConnection.addTrack(track, this.localStream));
    //         })
    //         .then(() => {
    //             // Build SDP for answer message
    //             return this.peerConnection.createAnswer();
    //         })
    //         .then((answer) => {
    //             // Set local SDP
    //             return this.peerConnection.setLocalDescription(answer);
    //         })
    //         .then(() => {
    //             // Send local SDP to remote party
    //             this.videoService.sendMessage({ type: 'answer', data: this.peerConnection.localDescription });

    //             this.inCall = true;
    //         })
    //         .catch(this.handleGetUserMediaError);
    // }

    // private handleAnswerMessage(msg: RTCSessionDescriptionInit): void {
    //     console.log('handle incoming answer');
    //     this.peerConnection.setRemoteDescription(msg);
    // }

    // private handleHangupMessage(msg: Message): void {
    //     console.log(msg);
    //     this.closeVideoCall();
    // }

    // private handleICECandidateMessage(msg: RTCIceCandidate): void {
    //     const candidate = new RTCIceCandidate(msg);
    //     this.peerConnection.addIceCandidate(candidate).catch(this.reportError);
    // }

    // private async requestMediaDevices(): Promise<void> {
    //     try {
    //         this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    //         // pause all tracks
    //         this.pauseLocalVideo();
    //     } catch (e: any) {
    //         console.error(e);
    //         alert(`getUserMedia() error: ${e.name}`);
    //     }
    // }

    // startLocalVideo(): void {
    //     console.log('starting local stream');
    //     this.localStream.getTracks().forEach((track) => {
    //         track.enabled = true;
    //     });
    //     this.localVideo.nativeElement.srcObject = this.localStream;

    //     this.localVideoActive = true;
    // }

    // pauseLocalVideo(): void {
    //     console.log('pause local stream');
    //     this.localStream.getTracks().forEach((track) => {
    //         track.enabled = false;
    //     });
    //     this.localVideo.nativeElement.srcObject = undefined;

    //     this.localVideoActive = false;
    // }

    // private createPeerConnection(): void {
    //     console.log('creating PeerConnection...');
    //     this.peerConnection = new RTCPeerConnection(ENV_RTCPeerConfiguration);

    //     this.peerConnection.onicecandidate = this.handleICECandidateEvent;
    //     this.peerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
    //     this.peerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
    //     this.peerConnection.ontrack = this.handleTrackEvent;
    // }

    // private closeVideoCall(): void {
    //     console.log('Closing call');

    //     if (this.peerConnection) {
    //         console.log('--> Closing the peer connection');

    //         this.peerConnection.ontrack = null;
    //         this.peerConnection.onicecandidate = null;
    //         this.peerConnection.oniceconnectionstatechange = null;
    //         this.peerConnection.onsignalingstatechange = null;

    //         // Stop all transceivers on the connection
    //         this.peerConnection.getTransceivers().forEach((transceiver) => {
    //             transceiver.stop();
    //         });

    //         // Close the peer connection
    //         this.peerConnection.close();
    //         //this.peerConnection = null;

    //         this.inCall = false;
    //     }
    // }

    // /* ########################  ERROR HANDLER  ################################## */
    // private handleGetUserMediaError(e: Error): void {
    //     switch (e.name) {
    //         case 'NotFoundError':
    //             alert('Unable to open your call because no camera and/or microphone were found.');
    //             break;
    //         case 'SecurityError':
    //         case 'PermissionDeniedError':
    //             // Do nothing; this is the same as the user canceling the call.
    //             break;
    //         default:
    //             console.log(e);
    //             alert('Error opening your camera and/or microphone: ' + e.message);
    //             break;
    //     }

    //     this.closeVideoCall();
    // }

    // private reportError = (e: Error) => {
    //     console.log('got Error: ' + e.name);
    //     console.log(e);
    // };

    // /* ########################  EVENT HANDLER  ################################## */
    // private handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    //     console.log(event);
    //     if (event.candidate) {
    //         this.videoService.sendMessage({
    //             type: 'ice-candidate',
    //             data: event.candidate,
    //         });
    //     }
    // };

    // private handleICEConnectionStateChangeEvent = (event: Event) => {
    //     console.log(event);
    //     switch (this.peerConnection.iceConnectionState) {
    //         case 'closed':
    //         case 'failed':
    //         case 'disconnected':
    //             this.closeVideoCall();
    //             break;
    //     }
    // };

    // private handleSignalingStateChangeEvent = (event: Event) => {
    //     console.log(event);
    //     switch (this.peerConnection.signalingState) {
    //         case 'closed':
    //             this.closeVideoCall();
    //             break;
    //     }
    // };

    // private handleTrackEvent = (event: RTCTrackEvent) => {
    //     console.log(event);
    //     this.remoteVideo.nativeElement.srcObject = event.streams[0];
    // };
}
