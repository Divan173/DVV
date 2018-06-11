import { 
	Directive,
	Output,
	EventEmitter,
	HostListener
} from '@angular/core';

@Directive({
	selector: '[appTableChooser]'
})
export class TableChooserDirective {
	@Output() onChooseTable = new EventEmitter();

	@HostListener('click', ['$event']) clicked($event) {
		this.onChooseTable.emit($event.target.attributes.id.nodeValue);
	}

	constructor() { }
}
