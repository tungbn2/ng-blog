import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageModule } from 'src/app/modules/home-page/home-page.module';
import { AuthPageModule } from 'src/app/modules/auth-page/auth-page.module';
import { SettingsPageModule } from 'src/app/modules/settings-page/settings-page.module';
import { ArticlePageModule } from 'src/app/modules/article-page/article-page.module';
import { EditorPageModule } from 'src/app/modules/editor-page/editor-page.module';
import { ProfilePageModule } from 'src/app/modules/profile-page/profile-page.module';

@NgModule({
  declarations: [],
  imports: [
    HomePageModule,
    AuthPageModule,
    SettingsPageModule,
    ArticlePageModule,
    EditorPageModule,
    ProfilePageModule,
  ],
  exports: [
    HomePageModule,
    AuthPageModule,
    SettingsPageModule,
    ArticlePageModule,
    EditorPageModule,
    ProfilePageModule,
  ],
})
export class AllAppModule {}
