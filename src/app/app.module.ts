import { MeinModule } from './mein/mein.module';
import { TemplateComponent } from './template/template.component';
import { RouterModule, Routes } from '@angular/router';
import { VideoDBService } from './shred/video-db.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {ReactiveFormsModule} from'@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { FirtsTestComponent } from './firts-test/firts-test.component';
import { SecondComponent } from './second/second.component';
import { TestComponent } from './test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { TestDirective } from './test.directive';

const meineRouten: Routes = [
  {path: 'video', component: SecondComponent},
  {path: '', component: TestComponent},
  {path: 'template', component: TemplateComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    FirtsTestComponent,
    SecondComponent,
    TestComponent,
    TemplateComponent,
    TestDirective
  ],
  imports: [
    RouterModule.forRoot(meineRouten),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MeinModule
  ],
  providers: [VideoDBService, {provide: 'VideoComponentConfig', useValue: 'meineKonfig'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
