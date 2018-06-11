import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReservationService {

	constructor(private http: HttpClient) { }

	public acceptReservation(hallId, tableId, clientName, clientPhone, fromDate, countHour): Observable<any> {
		const formData = new FormData();
		const req =  {
			"Method": 'Reservation',
			"HallId": hallId,
			"TableId": tableId,
			"FromDate": fromDate,
			"CountHour": countHour,
			"ClientName": clientName,
			"ClientPhone": clientPhone
		};
		formData.append('json', JSON.stringify(req))
		return this.http.post('http://localhost:64064/', formData);
	}

}
