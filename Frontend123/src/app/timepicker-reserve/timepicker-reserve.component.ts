import { 
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
 } from '@angular/core';

const now = new Date();

@Component({
	selector: 'app-timepicker-reserve',
	templateUrl: './timepicker-reserve.component.html',
	styleUrls: ['./timepicker-reserve.component.css']
})
export class TimepickerReserveComponent implements OnInit {

	@Output() onSelectTime = new EventEmitter<{hour: number , minute: number}>();
	time = { hour: now.getHours(), minute: now.getMinutes() };

	constructor() { }

	ngOnInit() {
		this.onSelectTime.emit({hour: this.time.hour, minute: this.time.minute });
	}

	onChange(event) {
		this.onSelectTime.emit({hour: this.time.hour, minute: this.time.minute });
	}
}
