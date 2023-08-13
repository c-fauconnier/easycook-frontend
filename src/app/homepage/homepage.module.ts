import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './homepage-routing.module';
import { HomepageViewComponent } from './components/homepage-view/homepage-view.component';

@NgModule({
    declarations: [
    HomepageViewComponent
  ],
    imports: [CommonModule, HomePageRoutingModule],
})
export class HomepageModule {}
