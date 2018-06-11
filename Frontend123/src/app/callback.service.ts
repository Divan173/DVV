import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CallbackService {

	constructor(private http: HttpClient) { }

	public acceptCallback(clientName, clientPhone): Observable<any> {
		const formData = new FormData();
		const req =  {
			"Method": 'RequestTable',
			"ClientName": clientName,
			"ClientPhone": clientPhone
		};
		formData.append('json', JSON.stringify(req))
		return this.http.post('http://localhost:64064/', formData);
	}

}
