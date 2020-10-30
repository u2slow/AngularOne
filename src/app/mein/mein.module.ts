import { VideotestComponent } from './../videotest/videotest.component';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteComponent } from './../website/website.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const meineRouten: Routes = [
  {path: 'website', component: WebsiteComponent}
];

@NgModule({
  declarations: [
    WebsiteComponent,
    VideotestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(meineRouten)
  ]
})
export class MeinModule { }
