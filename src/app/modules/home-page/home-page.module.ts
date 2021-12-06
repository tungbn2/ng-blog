import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../shared/modules/core/core.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CoreModule, HomeRoutingModule],
})
export class HomePageModule {}
