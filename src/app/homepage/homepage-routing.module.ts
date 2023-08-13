import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageViewComponent } from './components/homepage-view/homepage-view.component';

const routes: Routes = [{ path: '', component: HomepageViewComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class HomePageRoutingModule {}
