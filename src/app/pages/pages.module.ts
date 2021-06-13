import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../appRouting.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent
  ],
  exports:[
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent
  ]

})
export class PagesModule { }