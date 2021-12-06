import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorPageComponent } from './editor-page.component';
import { CoreModule } from '../shared/modules/core/core.module';

@NgModule({
  declarations: [EditorPageComponent],
  imports: [CoreModule, EditorRoutingModule],
})
export class EditorPageModule {}
