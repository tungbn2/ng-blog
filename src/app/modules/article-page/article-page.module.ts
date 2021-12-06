import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticlePageComponent } from './article-page.component';
import { CoreModule } from '../shared/modules/core/core.module';

@NgModule({
  declarations: [ArticlePageComponent],
  imports: [CoreModule, ArticleRoutingModule],
})
export class ArticlePageModule {}
