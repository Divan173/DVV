import { Component, OnInit } from '@angular/core';
import { CallbackService } from '../callback.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'app-modal-callback',
	templateUrl: './modal-callback.component.html',
	styleUrls: ['./modal-callback.component.css']
})
export class ModalCallbackComponent implements OnInit {
	clientName;
	clientPhone;
	phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

	constructor(private modalService: NgbModal, private callbackService: CallbackService) { }

	open(content) {
		this.modalService.open(content, {
			backdrop : 'static',
			beforeDismiss: () => {
				if (!this.clientName) {
					alert('Введите имя!');
					return false;
				}

				if (!this.clientPhone) {
					alert('Введите телефон!');
					return false;
				}

				return true;
			}
		}).result.then((result) => {
			
		}, (reason) => {
			if (reason && this.clientName && this.clientPhone) {
				this.callbackService.acceptCallback(this.clientName, this.clientPhone)
					.subscribe(resp => {
						const jsonResponse = JSON.parse(resp);
						if (!jsonResponse.Status) {
							alert('В ближайшее время мы свяжемся с Вами!');
						} else {
							alert(jsonResponse.Error);
						}
					}, error => console.error(error))
			}
		});
	}

	ngOnInit() {
	}

}
