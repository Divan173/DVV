import { Component, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HallsService } from '../halls.service';
import { TablesOfHallService } from '../tables-of-hall.service';
import { ReservationService } from '../reservation.service';
import { ModalHallMapsComponent } from '../modal-hall-maps/modal-hall-maps.component';


@Component({
	selector: 'app-modal-reserve',
	templateUrl: './modal-reserve.component.html',
	styleUrls: ['./modal-reserve.component.css'],
})
export class ModalReserveComponent {
	selectedHall: number;
	selectedHallCode: string;
	halls = [];
	closeResult: string;
	tablesOfHall = [];
	selectedTable: number;
	memTable: Object;
	duration: number;
	fromDate: Date;
	day;
	time;
	clientName;
	clientPhone;
	phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	

	constructor(private modalService: NgbModal, private hallsService: HallsService,
		private tablesOfHallService: TablesOfHallService, private reservationService: ReservationService) {}

	open(content) {
		this.modalService.open(content, {
			backdrop : 'static',
			beforeDismiss: () => {
				if (!~this.selectedHall) {
					alert('Укажите зал!');
					return false;
				}

				if (!~this.selectedTable) {
					alert('Выберите столик!');
					return false;
				}

				if (!this.clientName) {
					alert('Введите имя!');
					return false;
				}

				if (!this.clientPhone) {
					alert('Введите телефон!');
					return false;
				}

				if (!this.duration) {
					alert('Укажите длительность!');
					return false;
				}

				return true;
			}
		}).result.then((result) => {
			
		}, (reason) => {
			if (reason && ~this.selectedHall && ~this.selectedTable && this.clientName && this.clientPhone && this.duration) {
				this.reservationService.acceptReservation(this.selectedHall, this.selectedTable, this.clientName, this.clientPhone, this.fromDate, this.duration)
					.subscribe(resp => {
						const jsonResponse = JSON.parse(resp);
						if (!jsonResponse.Status) {
							alert('Столик успешно забронирован!');
						} else {
							alert(jsonResponse.Error);
						}
					}, error => console.error(error));
			}
		});

		this.hallsService.getHalls().subscribe(hallsList => {
			const resultHalls = JSON.parse(hallsList);
			if (!resultHalls.Status) {
				/* dirty hack*/
				for (let hall of resultHalls.Halls) {
					if (hall.Id == 1) {
						hall.hallCode = 'mushu';
					} else if (hall.Id == 2) {
						hall.hallCode = 'mama-pizza'
					} else {
						hall.hallCode = 'halva'
					}
				}
				/***/
			 	this.halls = resultHalls.Halls;
			} else {
				alert(resultHalls.Error);
			}
		}, error => console.error(error))

		this.selectedHall = -1;
		this.selectedTable = -1;
	}

	hallUpdate(event) {
		this.loadTables();
		this.selectedTable = -1;
		this.selectedHallCode = this.halls.find(item => item.Id == this.selectedHall).hallCode;
	}

	tableUpdate(selectedTable) {
		this.memTable = selectedTable.table;
		this.selectedTable = selectedTable.table.Id;
	}

	selectDay(selectedDay) {
		this.day = selectedDay.day;
		this.loadTables();
	}

	selectTime(selectedTime) {
		this.time = { hour: selectedTime.hour, minute: selectedTime.minute };
		this.loadTables();
	}

	durationUpdate(event) {
		this.loadTables();
	}

	private loadTables() {
		if (this.time && this.day && ~this.selectedHall && this.duration) {
			this.fromDate = new Date(this.day.year, this.day.month, this.day.day, this.time.hour, this.time.minute);
			this.tablesOfHallService.getTables(this.selectedHall, this.fromDate, this.duration).subscribe(listOfTables => {
				const response = JSON.parse(listOfTables);
				if (!response.Status) {
					const tablesArr = response.Tables;
					//const rawTables = tablesArr.filter(item => !item.IsClose);
					const resTables = tablesArr.map(item => {
						item.Table.IsClose = item.IsClose;
						return item.Table;
					});
					this.tablesOfHall = resTables;
				} else {
					alert(response.Error);
				}		
			}, error => console.error(error));
		}
	}
}
