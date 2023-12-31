import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxEchartsDirective, NgxEchartsModule, provideEcharts } from 'ngx-echarts';
import { CommonModule, DatePipe } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PlantStatusService } from './plant-status-service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    NgxEchartsDirective,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [DatePipe, PlantStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
