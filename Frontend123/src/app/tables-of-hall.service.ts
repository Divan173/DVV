import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TablesOfHallService {

	constructor(private http: HttpClient) { }

	public getTables(hallId, fromDate, countHour): Observable<any> {
		const formData = new FormData();
		const req =  {
			"Method": 'GetTables',
			"HallId": hallId,
			"FromDate": fromDate,
			"CountHour": countHour
		};
		formData.append('json', JSON.stringify(req))
		return this.http.post('http://localhost:64064/', formData);
	}
}