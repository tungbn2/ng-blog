import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './auth-page.component';
import { CoreModule } from '../shared/modules/core/core.module';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [CoreModule, AuthRoutingModule],
})
export class AuthPageModule {}
