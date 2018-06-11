import { 
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Table } from '../table';

@Component({
	selector: 'app-modal-hall-maps',
	templateUrl: './modal-hall-maps.component.html',
	styleUrls: ['./modal-hall-maps.component.css']
})
export class ModalHallMapsComponent implements OnInit {

	@Input() tablesArr: any[];
	@Input() hallCode: string;
	@Input() previousSelection: Table;
	@Output() onSelectTable = new EventEmitter<{ table: Object }>();

	selectedTable: Table;
	btnText: string;

	constructor(private modalService: NgbModal) {
		this.btnText = 'Выбрать стол';
	}

	open(content) {
		if (this.hallCode && this.tablesArr && this.tablesArr.length) {
			this.modalService.open(content, {
				size: 'lg',
				windowClass: this.hallCode === 'mushu' ? 'modal-xxl' : 'modal-xxl2'
			}).result.then((result) => {

			}, (reason) => {
				if (this.selectedTable) {
					this.onSelectTable.emit( { table: this.selectedTable } );
					this.btnText = 'Стол №' + this.selectedTable.Number;
				} else {
					alert('Стол не выбран!');
				}
			});

			if (this.previousSelection) {
				for (let tableItem of this.tablesArr) {
					if (tableItem.Number === this.previousSelection.Number && !tableItem.IsClose) {
						tableItem.IsSelected = true;
					} else {
						tableItem.IsSelected = false;
					}
				}
			}
		} else {
			alert('Перед выбором столика, укажите зал и длительность бронирования!');
		}
	}

	onSelect(id) {
		const numberTable = id.match(/\d+/g)[0];
		this.selectedTable = this.tablesArr.find(item => item.Number === parseInt(numberTable));

		for (let tableItem of this.tablesArr) {
			if (tableItem.Number === parseInt(numberTable) && !tableItem.IsClose) {
				tableItem.IsSelected = true;
			} else {
				tableItem.IsSelected = false;
			}
		}
	}

	clearSelection() {
		this.btnText = 'Выбрать стол';
		this.selectedTable = new Table();
		this.previousSelection = new Table();
	}

	ngOnInit() {
	}

}
