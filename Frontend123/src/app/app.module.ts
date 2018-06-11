import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { ModalReserveComponent } from './modal-reserve/modal-reserve.component';
import { DatepickerPopupComponent } from './datepicker-popup/datepicker-popup.component';
import { TimepickerReserveComponent } from './timepicker-reserve/timepicker-reserve.component';
import { ModalCallbackComponent } from './modal-callback/modal-callback.component';
import { PhotosCarouselComponent } from './photos-carousel/photos-carousel.component';
import { ModalHallMapsComponent } from './modal-hall-maps/modal-hall-maps.component';
import { TableChooserDirective } from './table-chooser.directive';
import { EventsChooserComponent } from './events-chooser/events-chooser.component';
import { YaCoreModule }  from 'angular2-yandex-maps';


@NgModule({
  declarations: [
    AppComponent,
    ModalReserveComponent,
    DatepickerPopupComponent,
    TimepickerReserveComponent,
    ModalCallbackComponent,
    PhotosCarouselComponent,
    ModalHallMapsComponent,
    TableChooserDirective,
    EventsChooserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    TextMaskModule,
    YaCoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
