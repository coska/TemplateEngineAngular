import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
// import { HttpTokenProvider } from './intercepters/http-token-interceptor';

import {
  ApiService, AppService,
} from './services';
import {
  AlertsComponent,
  PaginationComponent,
  UndermaintenanceComponent,
  LoadingComponent,
} from './components';
import { TruncatePipe } from '@app/core/pipes';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { MyMenuFilterPipe } from './pipes/MyMenuFilter.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    TruncatePipe,
    AlertsComponent,
    PaginationComponent,
    LoadingComponent,
    UndermaintenanceComponent,
    SafeHtmlPipe,
    MyMenuFilterPipe,
  ],
  providers: [
    // HttpTokenProvider,
    ApiService,
    AppService,
  ],
  exports: [
    TruncatePipe,
    AlertsComponent,
    PaginationComponent,
    LoadingComponent,
    UndermaintenanceComponent,
    SafeHtmlPipe,
    MyMenuFilterPipe,
  ]
})
export class CoreModule { }
