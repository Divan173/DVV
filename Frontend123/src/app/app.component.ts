import { Component, Input, ElementRef } from '@angular/core';
import { HallsService } from './halls.service';
import { TablesOfHallService } from './tables-of-hall.service';
import { ReservationService } from './reservation.service';
import { CallbackService } from './callback.service';
import { EventsService } from './events.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ HallsService, TablesOfHallService, ReservationService, CallbackService, EventsService ]
})
export class AppComponent {
	balloonHeader = 'Ресторанный комплекс Мушу';
	externalPath: string;

	constructor(private elementRef:ElementRef) {
		this.externalPath = this.elementRef.nativeElement.getAttribute('externalPath');
	}
	
	vidSwap(videoUrl) {
		var myVideo = document.getElementsByTagName('video')[0];
		myVideo.src = videoUrl;
		myVideo.load();
		myVideo.play();
	}
}
