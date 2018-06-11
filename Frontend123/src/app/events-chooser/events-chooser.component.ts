import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
	selector: 'app-events-chooser',
	templateUrl: './events-chooser.component.html',
	styleUrls: ['./events-chooser.component.css']
})
export class EventsChooserComponent implements OnInit {

	constructor(private eventsService: EventsService,) { }

	posters: string[];
	listEvents: Object[];

	onChange() {
		
	}

	ngOnInit() {
		this.eventsService.getPosters()
			.subscribe(resp => {
				const eventsRep = JSON.parse(resp);
				this.listEvents = eventsRep.Events;
			});
	}

}
