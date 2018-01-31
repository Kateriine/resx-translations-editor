import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FileUploadModule} from 'primeng/primeng';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { LoadXmlService } from '../providers/load-xml.service';
import { AppComponent } from './app.component';
import { TranslationComponent } from '../components/translation/translation.component';





@NgModule({
  declarations: [
    AppComponent,
    TranslationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [LoadXmlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
