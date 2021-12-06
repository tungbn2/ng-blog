import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/shared/modules/core/core.module';
import { AllAppModule } from './modules/shared/modules/app/app.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, AllAppModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
