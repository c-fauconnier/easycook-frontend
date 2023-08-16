import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageViewComponent } from './homepage/components/homepage-view/homepage-view.component';

const routes: Routes = [
    { path: 'video', loadChildren: () => import('./video-call/video-call.module').then((m) => m.VideoCallModule) },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule) },
    { path: 'lecture', loadChildren: () => import('./lecture/lecture.module').then((m) => m.LectureModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
    { path: '**', redirectTo: '', pathMatch: 'full', component: HomepageViewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
