import { 
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
	selector: 'app-datepicker-popup',
	templateUrl: './datepicker-popup.component.html',
	styleUrls: ['./datepicker-popup.component.css']
})
export class DatepickerPopupComponent implements OnInit {
	
	@Output() onSelectDay = new EventEmitter<{day: Date}>();
	model;

	constructor() {

	}

	ngOnInit() {
		this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
		this.onSelectDay.emit( { day: this.model } );
	}

	onChange() {
		this.onSelectDay.emit( { day: this.model } );
	}
}
