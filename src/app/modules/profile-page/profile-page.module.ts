import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { CoreModule } from '../shared/modules/core/core.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CoreModule, ProfileRoutingModule],
})
export class ProfilePageModule {}
